import sqlite3 from 'sqlite3'

export abstract class DbSqliteBase {
  protected db: sqlite3.Database
  static hasBeenInitialized: boolean = false

  constructor() {
    sqlite3.verbose()
    this.db = new sqlite3.Database('soundStageCli.db', (err) => {
      if (err) {
        console.error('Erro ao iniciar o banco:', err.message)
      } else {
        console.log('Banco criado/conectado com sucesso')
        // Ativa as foreign keys
        this.db.run('PRAGMA foreign_keys = ON;', (err) => {
          if (err) {
            console.error('Erro ao ativar foreign keys:', err.message)
          } else {
            console.log('Foreign keys ativadas com sucesso.')
          }
        })
      }
    })
  }

  protected async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run(`CREATE TABLE IF NOT EXISTS artists (
          artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR NOT NULL UNIQUE,  
          country VARCHAR NOT NULL,
          genre VARCHAR NOT NULL,
          year_of_foundation INTEGER
        );`,
          (err) => {
            if (err) return reject(err)
          }
        )

        this.db.run(`CREATE TABLE IF NOT EXISTS albums (
          album_id INTEGER PRIMARY KEY AUTOINCREMENT,  
          name VARCHAR NOT NULL,
          genre VARCHAR NOT NULL,
          record_label VARCHAR,
          tracks INTEGER NOT NULL,  
          year INTEGER NOT NULL,
          artist_id INTEGER NOT NULL,
          FOREIGN KEY (artist_id) REFERENCES artists (artist_id)
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
        
        this.db.run(`
          CREATE INDEX IF NOT EXISTS idx_albums_name
          ON albums (name);
        `,
          (err) => {
            if (err) return reject(err)
          }
        )

        resolve()
      })
    })
  }
}

