import { Artist } from "../classes/artist";
import { DbSqlite } from "./DbSqlite";

async function testeDb() {
  const db = new DbSqlite()
  // db.init()
  // db.createArtist(
  //   new Artist(
  //     {
  //       name: 'Black Sabbath',
  //       country: 'Reino Unido',
  //       genre: 'Heavy Metal'
  //     },
  //     'Mercury',
  //     1968
  //   )
  // )

  // const artists = await db.getArtist()
  // console.log(artists)

  // db.updateArtist({
  //   genre: 'Black Metal',
  //   country: 'Brazil',
  //   name: 'Teste',
  //   record_labels: 'Teste',
  //   year_of_foundation:0
  // })

  // db.deleteArtist({
  //   name: 'Teste'
  // })

}
testeDb()