import inquirer from "inquirer"
import { DbSqliteAlbums } from "./db/DbSqliteAlbums"
import { DbSqliteArtist } from "./db/DbSqliteArtist"
import { AlbumsActions, Operations, StandardActions } from "./enum/actions"
import { createAlbum } from "./albums/createAlbum"
import { getOneAlbum } from "./albums/getOneAlbum"
import { deleteAlbum } from "./albums/deleteAlbum"
import { updateAlbum } from "./albums/updateAlbum"
import { getAlbums } from "./albums/getAlbums"
import { soundStageCli } from "./cli"
import { getAlbumsByArtist } from "./albums/getAlbumsByArtist"

export async function albumsCli(): Promise<void> {
  const db = new DbSqliteAlbums()
  const artistDb = new DbSqliteArtist()
  
  while(true) {
    await inquirer.prompt([
      {
        type: 'list',
        name: 'albumsCli',
        message: 'Você está na seção de álbuns. Por favor, escolha uma ação.',
        choices: [
          AlbumsActions.CREATEALBUM,
          AlbumsActions.UPDATEALBUM,
          AlbumsActions.GETALBUMS,
          AlbumsActions.DELETEALBUM,
          AlbumsActions.GETONEALBUM,
          AlbumsActions.ALBUMSBYARTIST,
          StandardActions.BACK,
          Operations.EXIT
        ],
      }
    ])
    .then(async (answers) => {
      switch(answers.albumsCli) {
        case AlbumsActions.CREATEALBUM:
          await createAlbum(db, artistDb)
          break
        case AlbumsActions.UPDATEALBUM:
          await updateAlbum(db)
          break
        case AlbumsActions.GETALBUMS:
          await getAlbums(db)
          break
        case AlbumsActions.DELETEALBUM:
          await deleteAlbum(db)
          break
        case AlbumsActions.GETONEALBUM:
          await getOneAlbum(db)
          break
        case AlbumsActions.ALBUMSBYARTIST:
          await getAlbumsByArtist(db)
          break
        case StandardActions.BACK:
          await soundStageCli()
          break
        case Operations.EXIT:
          process.exit(0)
        default:
          console.log('Opção errada! Por favor tente novamente.')
      }
    })
    .catch((err) => console.log(err)) 
  } 
}