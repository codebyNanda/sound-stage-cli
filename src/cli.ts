// import * as inquirer from 'inquirer'
import inquirer from "inquirer"
import { Actions } from './enum/actions'
import { createArtist } from "./libraryOfArtistsCli/createArtist"
import { Artist } from "./classes/artist"
import { updateArtist } from "./libraryOfArtistsCli/updateArtist"
import { getArtist } from "./libraryOfArtistsCli/getArtist"
// import { select, Separator } from '@inquirer/prompts'
import db from './db/database'

async function firstCli(): Promise<void> {
  console.log('Bem-vindo ao meu primeiro CLI!')

  const artists: Artist[] = [] // Armazena os artistas criados
  
  while(true) {
    let breakLoop = false
    await inquirer.prompt([
      {
        type: 'list',
        name: 'library',
        message: 'Escolha o que deseja realizar nesta biblioteca: ',
        choices: [Actions.CreateArtist, Actions.UpdateArtist, Actions.GetArtist],
      }
    ])
    .then(async (answers) => {
      switch(answers.library) {
        case Actions.CreateArtist:
          const resultArtist = await createArtist()
          artists.push(resultArtist)
          console.log(resultArtist)
          break
        case Actions.UpdateArtist:
          const updating = await updateArtist(artists)
          console.log(updating)
          break
        case Actions.GetArtist:
          await getArtist(artists)
          // console.log(artists)
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
