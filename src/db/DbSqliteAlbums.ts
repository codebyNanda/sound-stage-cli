import { Album } from "../classes/albums"
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

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run(`CREATE TABLE IF NOT EXISTS albums (
          album_id INTEGER PRIMARY KEY AUTOINCREMENT,  
          name VARCHAR NOT NULL,
          genre VARCHAR NOT NULL,
          record_label VARCHAR,
          tracks INTEGER NOT NULL,  
          year INTEGER NOT NULL
        );`,
          (err) => {
            if (err) return reject(err)
          }
        )

        this.db.run(`
          CREATE INDEX IF NOT EXISTS idx_artists_name
          ON artists (name);
        `,
          (err) => {
            if (err) return reject(err)
          }
        )

        resolve()
      })
    })
  }

  async createAlbum(album: Album): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO albums (name, genre, record_label, tracks, year) 
        VALUES (?, ?, ?, ?, ?)`,
        [
          album.name,
          album.genre,
          album.record_label,
          album.tracks,
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

   async getAlbums(): Promise<Album[]> {
    return new Promise((resolve, reject) => {
      this.db.all<Album>(`SELECT * FROM albums`, (err, rows) => {
        if (err) return reject(err)
  
        if (!rows || rows.length === 0) {
          console.log('Nenhum album encontrado.')
          return resolve([])
        }

        const albums = rows.map(row => new Album(
          row.name,
          row.genre,
          row.record_label,
          row.tracks,
          row.year
        ))

        resolve(albums)
      })
    })
  }

   async updateAlbum(album: Partial<Album>): Promise<void> {
    if (!album.name) {
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
         WHERE name = ?`,
         [nameOfAlbum],
         (err) => {
          if (err) return reject(err)
          console.log('Album deletado com sucesso.')
          resolve()
        }
      )
    })
  }

  async getOneAlbum(name: string): Promise<Album | null> {
    return new Promise((resolve, reject) => {
      this.db.get<Album>(`SELECT * FROM albums WHERE name= ?`, [name], (err, row) => {
        if (err) return reject(err)
  
        if (!row) return resolve(null)

        const album = new Album(
          row.name,
          row.genre,
          row.record_label,
          row.tracks,
          row.year
        )

        resolve(album)
      })
    })
  }

  private generateUpdateQuery(album: Partial<Album>): { query: string; values: (string | number)[] } {
      const fields: string[] = []
      const values: (string | number)[] = []

      if (album.name) {
        fields.push('name = ?')
        values.push(album.name)
      }
      if (album.genre) {
        fields.push('genre = ?')
        values.push(album.genre)
      }
      if (album.record_label) {
        fields.push('record_label = ?')
        values.push(album.record_label)
      }
      if (album.tracks) {
        fields.push('tracks = ?')
        values.push(album.tracks)
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

      values.push(album.name as string)

      return { query, values }
    }
}