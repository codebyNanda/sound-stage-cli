import inquirer from "inquirer"
import { Operations } from './enum/actions'
import { DbSqlite } from "./db/DbSqlite"
import { albumsCli } from "./albumsCli"
import { artistsCli } from "./artistsCli"

export async function firstCli(): Promise<void> {
  console.log('🔥 Bem-vindo a Sound Stage Library CLI! 🔥')

  const db = new DbSqlite()
  
  while(true) {
    await inquirer.prompt([
      {
        type: 'list',
        name: 'soundStagelibrary',
        message: 'O que deseja fazer? ',
        choices: [
          Operations.ARTIST,
          Operations.ALBUM,
          Operations.EXIT
        ],
      }
    ])
    .then(async (answers) => {
      switch(answers.soundStagelibrary) {
        case Operations.ARTIST:
          console.log('Você está na seção de artistas. Por favor, escolha uma ação.')
          await artistsCli()
          break
        case Operations.ALBUM:
          console.log('Você está na seção de álbuns. Por favor, escolha uma ação.')
          await albumsCli()
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
firstCli()



