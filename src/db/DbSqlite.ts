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

  init(): void {
    this.db.serialize(() => {
        this.db.run(`CREATE TABLE IF NOT EXISTS artists (
            artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
            CREATE INDEX name VARCHAR NOT NULL UNIQUE,
            country VARCHAR NOT NULL,
            genre VARCHAR NOT NULL,
            record_labels VARCHAR,
            year_of_foundation INTEGER,
            album_id INTEGER
            );`)

         this.db.run(`CREATE TABLE IF NOT EXISTS albuns (
            album_id INTEGER PRIMARY KEY AUTOINCREMENT,  
            name VARCHAR NOT NULL,  
            year INTEGER NOT NULL,  
            number_of_tracks INTEGER NOT NULL,  
            record_label VARCHAR
            );`)

          this.db.run(`
            CREATE INDEX IF NOT EXISTS idx_artists_name
            ON artists (name);
          `)
    })
  }

  async createArtist(artist: Artist): Promise<void> {
      console.log('TESTANDO FUNÇÃO')
      this.db.run(
        `INSERT INTO artists (name, genre, country, record_labels, year_of_foundation) VALUES (?, ?, ?, ?, ?)`,
        [artist.name, artist.genre, artist.country, artist.record_labels, artist.year_of_foundation],
          (err: Error) => {
          if (err) {
            console.error('Erro ao inserir artista', err.message)
          } else { 
            console.log('Artista inserido com sucesso') 
          }
        }
      )
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
    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE artists 
        SET country = ?, 
            genre = ?, 
            record_labels = ?, 
            year_of_foundation = ?
        WHERE name = ?`,
        [
          artist.country,
          artist.genre,
          artist.record_labels,
          artist.year_of_foundation,
          artist.name,
        ],
        (err) => {
          if (err) return reject(err)
          resolve()
        }
      )
    })
  }

  async deleteArtist(artist: Partial<Artist>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!artist.name) {
        throw new Error('Nome do artista é obrigatório para excluir.')
      }
       this.db.run(
        `DELETE FROM artists
         WHERE name = ?`,
         [artist.name],
         (err) => {
          if (err) return reject(err)
          resolve()
        }
      )
    })
  }
}

