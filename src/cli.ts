import inquirer from "inquirer"
import { Actions } from './enum/actions'
import { createArtist } from "./libraryOfArtistsCli/createArtist"
import { updateArtist } from "./libraryOfArtistsCli/updateArtist"
import { getArtist } from "./libraryOfArtistsCli/getArtist"
import { DbSqlite } from "./db/DbSqlite"
import { deleteArtist } from "./libraryOfArtistsCli/deleteArtist"
import { getOneArtist } from "./libraryOfArtistsCli/getOneArtist"

export async function firstCli(): Promise<void> {
  console.log('🔥 Bem-vindo a Sound Stage Library CLI! 🔥')

  const db = new DbSqlite()
  
  while(true) {
    await inquirer.prompt([
      {
        type: 'list',
        name: 'soundStagelibrary',
        message: 'O que deseja fazer na Sound Stage Library? ',
        choices: [
          Actions.CreateArtist, 
          Actions.UpdateArtist, 
          Actions.GetArtist, 
          Actions.DeleteArtist,
          Actions.GetOneArtist, 
          Actions.Exit
        ],
      }
    ])
    .then(async (answers) => {
      switch(answers.soundStagelibrary) {
        case Actions.CreateArtist:
          await createArtist(db)
          break
        case Actions.UpdateArtist:
          await updateArtist(db)
          break
        case Actions.GetArtist:
          await getArtist(db)
          break
        case Actions.DeleteArtist:
          await deleteArtist(db)
          break
        case Actions.GetOneArtist:
          await getOneArtist(db)
          break
        case Actions.Exit:
          process.exit(0)
        default:
          console.log('Opção errada! Por favor tente novamente.')
      }
    })
    .catch((err) => console.log(err)) 
  } 
}
firstCli()
