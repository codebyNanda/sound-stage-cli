import { Artist } from "../classes/artist";
import { DbSqliteAlbums } from "./DbSqliteAlbums";
import { DbSqliteArtist } from "./DbSqliteArtist";

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