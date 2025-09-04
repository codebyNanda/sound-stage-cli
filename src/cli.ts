// import * as inquirer from 'inquirer'
import inquirer from "inquirer"
import { Actions } from './enum/actions'
import { createArtist } from "./libraryOfArtistsCli/createArtist"
import { Artist } from "./classes/artist"
import { updateArtist } from "./libraryOfArtistsCli/updateArtist"
import { getArtist } from "./libraryOfArtistsCli/getArtist"
import { DbSqlite } from "./db/DbSqlite"
import { deleteArtist } from "./libraryOfArtistsCli/deleteArtist"
// import { select, Separator } from '@inquirer/prompts'

async function firstCli(): Promise<void> {
  console.log('Bem-vindo ao meu primeiro CLI!')

  const db = new DbSqlite()
  
  while(true) {
    let breakLoop = false
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
          const resultArtist = await createArtist(db)
          console.log(resultArtist)
          break
        case Actions.UpdateArtist:
          // const updating = await updateArtist(artists)
          // console.log(updating)
          break
        case Actions.GetArtist:
          // await getArtist(artists)
          // console.log(artists)
        case Actions.DeleteArtist:
          await deleteArtist(db)
          break
        default:
          console.log('Opção errada! Por favor tente novamente.')
      }
    })
    .catch((err) => console.log(err)) 
  if (breakLoop) break
  } 
}
firstCli()
