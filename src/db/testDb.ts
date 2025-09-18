import { Artist } from "../classes/artist";
import { DbSqlite } from "./DbSqlite";

async function testeDb() {
  const db = new DbSqlite()
  db.init()
  // db.createArtist(
  //   new Artist(
  //     {
  //       name: 'Candlemass',
  //       country: 'Suécia',
  //       genre: 'Doom Metal'
  //     },
  //     'Napalm Records',
  //     1985
  //   )
  // )

  // const artists = await db.getArtist()
  // console.log(artists)

  // db.updateArtist({
  //   genre: 'Random',
  //   country: 'Brazil',
  //   name: 'Teste 4',
  //   // record_labels: 'Teste',
  //   // year_of_foundation:0
  // })

  // db.deleteArtist({
  //   name: 'Teste 3'
  // })

  // const artist = await db.getOneArtist('Candlemass')
  // console.log(artist)

}
testeDb()