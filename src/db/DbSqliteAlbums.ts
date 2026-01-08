import { Album } from "../classes/albums"
import { EnsureInitialized } from "../decorators/ensureInitialized"
import { IAlbumDatabase } from "../interfaces/iAlbumDatabase"
import { DbSqliteBase } from "./DbSqliteBase"

export class DbSqliteAlbums extends DbSqliteBase implements IAlbumDatabase {
  constructor() {
      super()
  }

  @EnsureInitialized()
  async createAlbum(album: Album): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO albums (name, genre, record_label, tracks, year, artist_id) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          album.name,
          album.genre,
          album.record_label,
          album.tracks,
          album.year,
          album.artist_id
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

   @EnsureInitialized()
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

  @EnsureInitialized()
   async updateAlbum(album: Partial<Album>): Promise<void> {
    if (!album.name) {
      throw new Error('Nome do album é obrigatório para atualizar. ⚠️')
    }

    const { query, values } = this.generateUpdateQuery(album)

    return new Promise((resolve, reject) => {
      this.db.run(query, values, (err) => {
        if (err) return reject(err)
          console.log('Album atualizado com sucesso! 🔥')  
          resolve()
      })
    })
  }

  @EnsureInitialized()
  async deleteAlbum(name: string): Promise<void> {
    return new Promise((resolve, reject) => {
       this.db.run(
        `DELETE FROM albums
         WHERE name = ?`,
         [name],
         (err) => {
          if (err) return reject(err)
          console.log('Album deletado com sucesso.')
          resolve()
        }
      )
    })
  }

  @EnsureInitialized()
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

  @EnsureInitialized()
  async findAllAlbumsByArtist(artistName: string): Promise<Album[]> {
    return new Promise((resolve, reject) => {
      this.db.all<Album>(
        `SELECT albums.* 
         FROM albums 
         INNER JOIN artists ON albums.artist_id = artists.artist_id 
         WHERE artists.name = ?`,
        [artistName],
        (err, rows) => {
          if (err) return reject(err)

          if (!rows || rows.length === 0) {
            console.log(`Nenhum álbum encontrado para o artista "${artistName}".`)
            return resolve([])
          }

          const albums = rows.map(row => new Album(
            row.name,
            row.genre,
            row.record_label,
            row.tracks,
            row.year,
            row.artist_id
          ))

          resolve(albums)
        }
      )
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
        WHERE name = ?
      `

      values.push(album.name as string)

      return { query, values }
    }
}