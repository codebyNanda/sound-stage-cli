import inquirer from "inquirer"
import { ArtistsActions } from './enum/actions'
import { createArtist } from "./artists/createArtist"
import { updateArtist } from "./artists/updateArtist"
import { getArtist } from "./artists/getArtist"
import { DbSqlite } from "./db/DbSqlite"
import { deleteArtist } from "./artists/deleteArtist"
import { getOneArtist } from "./artists/getOneArtist"

export async function artistsCli(): Promise<void> {
  console.log('🔥 Bem-vindo ao menu de artistas! 🔥')

  const db = new DbSqlite()
  
  while(true) {
    await inquirer.prompt([
      {
        type: 'list',
        name: 'artistsCli',
        message: 'O que deseja fazer? ',
        choices: [
          ArtistsActions.CreateArtist, 
          ArtistsActions.UpdateArtist, 
          ArtistsActions.GetArtist, 
          ArtistsActions.DeleteArtist,
          ArtistsActions.GetOneArtist, 
          ArtistsActions.Exit
        ],
      }
    ])
    .then(async (answers) => {
      switch(answers.artistsCli) {
        case ArtistsActions.CreateArtist:
          await createArtist(db)
          break
        case ArtistsActions.UpdateArtist:
          await updateArtist(db)
          break
        case ArtistsActions.GetArtist:
          await getArtist(db)
          break
        case ArtistsActions.DeleteArtist:
          await deleteArtist(db)
          break
        case ArtistsActions.GetOneArtist:
          await getOneArtist(db)
          break
        case ArtistsActions.Exit:
          process.exit(0)
        default:
          console.log('Opção errada! Por favor tente novamente.')
      }
    })
    .catch((err) => console.log(err)) 
  } 
}


