import { Artist } from "../classes/artist";
import { DbSqliteAlbums } from "./DbSqliteAlbums";
import { DbSqliteArtist } from "./DbSqliteArtist";

// Teste de banco de dados
async function testeDb() {
  const db = new DbSqliteAlbums()
  const dbArtist = new DbSqliteArtist()
  dbArtist.createArtist(
    new Artist(
      {
        name: 'Candlemass',
        country: 'Suécia',
        genre: 'Doom Metal'
      },
      1985
    )
  )
}
testeDb()