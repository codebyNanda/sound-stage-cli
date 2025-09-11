import { IDatabaseConnector } from "../interfaces/iDatabaseConnector";
import { confirm, input } from '@inquirer/prompts';

export async function deleteArtist(db: IDatabaseConnector) {

  const inputNameConfirm = await input({ message: 'Digite o nome do artista/banda que deseja deletar:' })
  
  const shouldList = await confirm({ message: `Certeza que deseja excluir ${inputNameConfirm}?` })

  if (!shouldList) {
    console.log('Usuário cancelou a exclusão.')
  }

  return db.deleteArtist(
    inputNameConfirm
  )
}