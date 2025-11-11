import inquirer from "inquirer"
import { DbSqliteAlbums } from "./db/DbSqliteAlbums"
import { DbSqliteArtist } from "./db/DbSqliteArtist"
import { AlbumsActions, StandardActions } from "./enum/actions"
import { createAlbum } from "./albums/createAlbum"
import { getOneAlbum } from "./albums/getOneAlbum"
import { deleteAlbum } from "./albums/deleteAlbum"
import { updateAlbum } from "./albums/updateAlbum"
import { getAlbums } from "./albums/getAlbums"
import { firstCli } from "./cli"

export async function albumsCli(): Promise<void> {
  console.log('🔥 Bem-vindo ao menu de albuns! 🔥')

  const db = new DbSqliteAlbums()
  const artistDb = new DbSqliteArtist()
  
  while(true) {
    await inquirer.prompt([
      {
        type: 'list',
        name: 'albumsCli',
        message: 'O que deseja fazer? ',
        choices: [
          AlbumsActions.CreateAlbum,
          AlbumsActions.UpdateAlbum,
          AlbumsActions.GetAlbum,
          AlbumsActions.DeleteAlbum,
          AlbumsActions.GetOneAlbum,
          StandardActions.Back,
          StandardActions.Exit
        ],
      }
    ])
    .then(async (answers) => {
      switch(answers.albumsCli) {
        case AlbumsActions.CreateAlbum:
          await createAlbum(db, artistDb)
          break
        case AlbumsActions.UpdateAlbum:
          await updateAlbum(db)
          break
        case AlbumsActions.GetAlbum:
          await getAlbums(db)
          break
        case AlbumsActions.DeleteAlbum:
          await deleteAlbum(db)
          break
        case AlbumsActions.GetOneAlbum:
          await getOneAlbum(db)
          break
        case StandardActions.Back:
          await firstCli()
          break
        case StandardActions.Exit:
          process.exit(0)
        default:
          console.log('Opção errada! Por favor tente novamente.')
      }
    })
    .catch((err) => console.log(err)) 
  } 
}