import { Artist } from "../classes/artist"
import { IDatabaseConnector } from "../interfaces/iDatabaseConnector"
import sqlite3 from 'sqlite3'

export class DbSqlite implements IDatabaseConnector {
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
        this.db.run(`CREATE TABLE IF NOT EXISTS artists (
          artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR NOT NULL UNIQUE,  
          country VARCHAR NOT NULL,
          genre VARCHAR NOT NULL,
          record_labels VARCHAR,
          year_of_foundation INTEGER,
          album_id INTEGER
        );`,
          (err) => {
            if (err) return reject(err)
          }
        )

        this.db.run(`CREATE TABLE IF NOT EXISTS albums (
          album_id INTEGER PRIMARY KEY AUTOINCREMENT,  
          name_of_album VARCHAR NOT NULL,
          genre_of_album VARCHAR NOT NULL,
          record_label VARCHAR,
          number_of_tracks INTEGER NOT NULL,  
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

  async createArtist(artist: Artist): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO artists (name, genre, country, record_labels, year_of_foundation) 
        VALUES (?, ?, ?, ?, ?)`,
        [
          artist.name, 
          artist.genre, 
          artist.country, 
          artist.record_labels, 
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
          row.record_labels,
          row.year_of_foundation
        ))

        resolve(artists)
      })
    })
  }

  async updateArtist(artist: Partial<Artist>): Promise<void> {
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
          row.record_labels,
          row.year_of_foundation
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
    if (artist.record_labels) {
      fields.push('record_labels = ?')
      values.push(artist.record_labels)
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

