import sqlite3 from 'sqlite3'

sqlite3.verbose()

export const db = new sqlite3.Database('soundStageCli.db', (err) => {
  if (err) {
    console.error('Erro ao iniciar o banco:', err.message)
  } else {
    console.log('Banco criado/conectado com sucesso')
  }
})


db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS artists (
      artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR NOT NULL UNIQUE,
      COUNTRY VARCHAR NOT NULL,
      GENRE VARCHAR NOT NULL,
      RECORD_LABELS VARCHAR,
      YEAR_OF_FUNDATION INTEGER,
      ALBUM_ID INTEGER
      );`)

    db.run(`CREATE TABLE IF NOT EXISTS albuns (
      album_id INTEGER PRIMARY KEY AUTOINCREMENT,  
      name VARCHAR NOT NULL,  
      year INTEGER NOT NULL,  
      number_of_tracks INTEGER NOT NULL,  
      record_label VARCHAR
      );`)
})

export default db