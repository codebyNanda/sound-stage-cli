import { Albums } from "../classes/albums"
import { IAlbumDatabase } from "../interfaces/iAlbumDatabase"
import sqlite3 from 'sqlite3'

export class DbSqliteAlbums implements IAlbumDatabase {
  private db: sqlite3.Database

  constructor() {
      sqlite3.verbose()
      this.db = new sqlite3.Database('soundStageCli.db', (err) => {
        if (err) {
          console.error('Erro ao iniciar o banco:', err.message)
        } else {
          console.log('Banco criado/conectado com sucesso')
        }
      })
  }

  async createAlbum(album: Albums): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO albums (name_of_album, genre_of_album, record_label, number_of_tracks, year) 
        VALUES (?, ?, ?, ?, ?)`,
        [
          album.nameOfAlbum,
          album.genreOfAlbum,
          album.recordLabel,
          album.numberOfTracks,
          album.year
        ],
        (err: Error | null) => {
          if (err) {
            console.error('Erro ao inserir album', err.message)
            return reject(err)
          } 
          console.log('Album inserido com sucesso! 🔥')
          resolve() 
        }
      )
    })
  }

   async getAlbums(): Promise<Albums[]> {
    return new Promise((resolve, reject) => {
      this.db.all<Albums>(`SELECT * FROM albums`, (err, rows) => {
        if (err) return reject(err)
  
        if (!rows || rows.length === 0) {
          console.log('Nenhum album encontrado.')
          return resolve([])
        }

        const albums = rows.map(row => new Albums(
          row.nameOfAlbum,
          row.genreOfAlbum,
          row.recordLabel,
          row.numberOfTracks,
          row.year
        ))

        resolve(albums)
      })
    })
  }

   async updateAlbum(album: Partial<Albums>): Promise<void> {
    if (!album.nameOfAlbum) {
      throw new Error('Nome do album é obrigatório para atualizar. ⚠️')
    }

    const { query, values } = this.generateUpdateQuery(album)

    return new Promise((resolve, reject) => {
      this.db.run(query, values, (err) => {
        if (err) return reject(err)
          console.log('Album atualizado com sucesso!')  
          resolve()
      })
    })
  }

  async deleteAlbum(nameOfAlbum: string): Promise<void> {
    return new Promise((resolve, reject) => {
       this.db.run(
        `DELETE FROM albums
         WHERE nameOfAlbum = ?`,
         [nameOfAlbum],
         (err) => {
          if (err) return reject(err)
          console.log('Album deletado com sucesso.')
          resolve()
        }
      )
    })
  }

  async getOneAlbum(nameOfAlbum: string): Promise<Albums | null> {
    return new Promise((resolve, reject) => {
      this.db.get<Albums>(`SELECT * FROM albums WHERE nameOfAlbum = ?`, [nameOfAlbum], (err, row) => {
        if (err) return reject(err)
  
        if (!row) return resolve(null)

        const album = new Albums(
          row.nameOfAlbum,
          row.genreOfAlbum,
          row.recordLabel,
          row.numberOfTracks,
          row.year
        )

        resolve(album)
      })
    })
  }

  private generateUpdateQuery(album: Partial<Albums>): { query: string; values: (string | number)[] } {
      const fields: string[] = []
      const values: (string | number)[] = []
  
      if (album.nameOfAlbum) {
        fields.push('nameOfAlbum = ?')
        values.push(album.nameOfAlbum)
      }
      if (album.genreOfAlbum) {
        fields.push('genreOfAlbum = ?')
        values.push(album.genreOfAlbum)
      }
      if (album.recordLabel) {
        fields.push('recordLabel = ?')
        values.push(album.recordLabel)
      }
      if (album.numberOfTracks) {
        fields.push('number_of_tracks = ?')
        values.push(album.numberOfTracks)
      }
      if (album.year) {
        fields.push('year = ?')
        values.push(album.year)
      }
       if (fields.length === 0) {
        throw new Error('Nenhum campo para atualizar foi informado.')
      }
  
       const query = `
        UPDATE albums
        SET ${fields.join(', ')}
        WHERE nameOfAlbum = ?
      `

      values.push(album.nameOfAlbum as string)

      return { query, values }
    }
}