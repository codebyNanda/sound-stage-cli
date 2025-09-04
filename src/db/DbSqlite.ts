import { rejects } from "assert"
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

        this.db.run(`CREATE TABLE IF NOT EXISTS albuns (
          album_id INTEGER PRIMARY KEY AUTOINCREMENT,  
          name VARCHAR NOT NULL,  
          year INTEGER NOT NULL,  
          number_of_tracks INTEGER NOT NULL,  
          record_label VARCHAR
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
    console.log('TESTANDO CREATE')

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
          console.log('Artista inserido com sucesso')
          resolve() 
        }
      )
    })
  }

  async getArtist(): Promise<Artist[]> {
    console.log('TESTANDO GET')
  return new Promise((resolve, reject) => {
    this.db.all<Artist>(`SELECT * FROM artists`, (err, rows) => {
      if (err) return reject(err)

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
  console.log('TESTANDO UPDATE')

  if (!artist.name) {
    throw new Error('Nome do artista é obrigatório para atualizar.')
  }

  const { query, values } = this.generateUpdateQuery(artist)

  return new Promise((resolve, reject) => {
    this.db.run(query, values, (err) => {
      if (err) return reject(err)
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
          console.log('Artista/banda deletado com sucesso.')
          resolve()
        }
      )
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

