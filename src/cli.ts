import inquirer from "inquirer"
import { Actions } from './enum/actions'
import { createArtist } from "./libraryOfArtistsCli/createArtist"
import { updateArtist } from "./libraryOfArtistsCli/updateArtist"
import { getArtist } from "./libraryOfArtistsCli/getArtist"
import { DbSqlite } from "./db/DbSqlite"
import { deleteArtist } from "./libraryOfArtistsCli/deleteArtist"

async function firstCli(): Promise<void> {
  console.log('Bem-vindo ao meu primeiro CLI!')

  const db = new DbSqlite()
  
  while(true) {
    await inquirer.prompt([
      {
        type: 'list',
        name: 'soundStagelibrary',
        message: 'O que deseja realizar na sound stage cli? ',
        choices: [Actions.CreateArtist, Actions.UpdateArtist, Actions.GetArtist, Actions.DeleteArtist, Actions.Exit],
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
