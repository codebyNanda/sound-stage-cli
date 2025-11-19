import inquirer from "inquirer"
import { ArtistsActions, StandardActions } from './enum/actions'
import { createArtist } from "./artists/createArtist"
import { updateArtist } from "./artists/updateArtist"
import { getArtist } from "./artists/getArtist"
import { DbSqliteArtist } from "./db/DbSqliteArtist"
import { deleteArtist } from "./artists/deleteArtist"
import { getOneArtist } from "./artists/getOneArtist"
import { soundStageCli } from "./cli"

export async function artistsCli(): Promise<void> {
  const db = new DbSqliteArtist()
  
  while(true) {
    await inquirer.prompt([
      {
        type: 'list',
        name: 'artistsCli',
        message: 'Você está na seção de artistas. Por favor, escolha uma ação',
        choices: [
          ArtistsActions.CREATEARTIST, 
          ArtistsActions.UPDATEARTIST, 
          ArtistsActions.GETARTISTS, 
          ArtistsActions.DELETEARTIST,
          ArtistsActions.GETONEARTIST, 
          StandardActions.BACK,
          StandardActions.EXIT
        ],
      }
    ])
    .then(async (answers) => {
      switch(answers.artistsCli) {
        case ArtistsActions.CREATEARTIST:
          await createArtist(db)
          break
        case ArtistsActions.UPDATEARTIST:
          await updateArtist(db)
          break
        case ArtistsActions.GETARTISTS:
          await getArtist(db)
          break
        case ArtistsActions.DELETEARTIST:
          await deleteArtist(db)
          break
        case ArtistsActions.GETONEARTIST:
          await getOneArtist(db)
          break
        case StandardActions.BACK:
          await soundStageCli()
          break
        case StandardActions.EXIT:
          process.exit(0)
        default:
          console.log('Opção errada! Por favor tente novamente.')
      }
    })
    .catch((err) => console.log(err)) 
  } 
}


