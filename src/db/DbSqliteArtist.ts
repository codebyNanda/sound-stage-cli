import { Artist } from "../classes/artist"
import { IArtistDatabase } from "../interfaces/iArtistDatabase"
import { DbSqliteBase } from "./DbSqliteBase"

export class DbSqliteArtist extends DbSqliteBase implements IArtistDatabase {
  constructor() {
    super()
  }

  async createArtist(artist: Artist): Promise<void> {
    if (!DbSqliteBase.hasBeenInitialized) {
      await this.init()
      DbSqliteBase.hasBeenInitialized = true
    }
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO artists (name, genre, country, year_of_foundation) 
        VALUES (?, ?, ?, ?)`,
        [
          artist.name, 
          artist.genre, 
          artist.country, 
          artist.year_of_foundation
        ],
        (err: Error | null) => {
          if (err) {
            console.error('Erro ao inserir artista', err.message)
            return reject(err)
          } 
          console.log('Artista inserido com sucesso! 🔥')
          resolve() 
        }
      )
    })
  }

  async getArtist(): Promise<Artist[]> {
    if (!DbSqliteBase.hasBeenInitialized) {
      await this.init()
      DbSqliteBase.hasBeenInitialized = true
    }
    return new Promise((resolve, reject) => {
      this.db.all<Artist>(`SELECT * FROM artists`, (err, rows) => {
        if (err) return reject(err)

        if (!rows || rows.length === 0) {
          console.log('Nenhum artista encontrado.')
          return resolve([])
        }

        const artists = rows.map(row => new Artist(
          {
            name: row.name,
            genre: row.genre,
            country: row.country
          },
          row.year_of_foundation,
          row.artist_id
        ))

        resolve(artists)
      })
    })
  }

  async updateArtist(artist: Partial<Artist>): Promise<void> {
    if (!DbSqliteBase.hasBeenInitialized) {
      await this.init()
      DbSqliteBase.hasBeenInitialized = true
    }

    if (!artist.name) {
      throw new Error('Nome do artista é obrigatório para atualizar. ⚠️')
    }

    const { query, values } = this.generateUpdateQuery(artist)

    return new Promise((resolve, reject) => {
      this.db.run(query, values, (err) => {
        if (err) return reject(err)
        console.log('Artista atualizado com sucesso!')  
        resolve()
      })
    })
  }

  async deleteArtist(name: string): Promise<void> {
    if (!DbSqliteBase.hasBeenInitialized) {
      await this.init()
      DbSqliteBase.hasBeenInitialized = true
    }
    return new Promise((resolve, reject) => {
       this.db.run(
        `DELETE FROM artists
         WHERE name = ?`,
         [name],
         (err) => {
          if (err) return reject(err)
          console.log('Artista deletado com sucesso.')
          resolve()
        })
    })
  }

  async getOneArtist(name: string): Promise<Artist | null> {
    if (!DbSqliteBase.hasBeenInitialized) {
      await this.init()
      DbSqliteBase.hasBeenInitialized = true
    }
    return new Promise((resolve, reject) => {
      this.db.get<Artist>(`SELECT * FROM artists WHERE name = ?`, [name], (err, row) => {
        if (err) return reject(err)

        if (!row) return resolve(null)

        const artist = new Artist(
          {
            name: row.name,
            genre: row.genre,
            country: row.country
          },
          row.year_of_foundation,
          row.artist_id
        )

        resolve(artist)
      })
    })
  }

  private generateUpdateQuery(artist: Partial<Artist>): { query: string; values: (string | number)[] } {
    const fields: string[] = []
    const values: (string | number)[] = []

    if (artist.country) {
      fields.push('country = ?')
      values.push(artist.country)
    }
    if (artist.genre) {
      fields.push('genre = ?')
      values.push(artist.genre)
    }
    if (artist.year_of_foundation) {
      fields.push('year_of_foundation = ?')
      values.push(artist.year_of_foundation)
    }

     if (fields.length === 0) {
      throw new Error('Nenhum campo para atualizar foi informado.')
    }

     const query = `
      UPDATE artists
      SET ${fields.join(', ')}
      WHERE name = ?
    `


    values.push(artist.name as string)

    return { query, values }
  }
}

