// import * as inquirer from 'inquirer'
import inquirer from "inquirer"
import { Actions } from './enum/actions'
import { createArtist } from "./libraryOfArtistsCli/createArtist"
import { Artist } from "./classes/artist"
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
        name: 'library',
        message: 'Escolha o que deseja realizar nesta biblioteca: ',
        choices: [Actions.CreateArtist, Actions.UpdateArtist, Actions.GetArtist, Actions.DeleteArtist],
      }
    ])
    .then(async (answers) => {
      switch(answers.library) {
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
        default:
          console.log('Opção errada! Por favor tente novamente.')
      }
    })
    .catch((err) => console.log(err)) 
  } 
}
firstCli()
