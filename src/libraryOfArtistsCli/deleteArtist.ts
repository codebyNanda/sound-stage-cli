import { IDatabaseConnector } from "../interfaces/iDatabaseConnector";
import { confirm, input } from '@inquirer/prompts';

export async function deleteArtist(db: IDatabaseConnector) {

  const inputNameConfirm = await input({ message: 'Digite o nome do artista/banda que deseja deletar:' })
  
  await confirm({ message: `Certeza que deseja excluir ${inputNameConfirm}?` })

  return db.deleteArtist(
    inputNameConfirm
  )
}