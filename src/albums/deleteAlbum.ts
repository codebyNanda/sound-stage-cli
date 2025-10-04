import { IAlbumDatabase } from "../interfaces/iAlbumDatabase"
import { confirm, input } from '@inquirer/prompts'

export async function deleteAlbum(db: IAlbumDatabase): Promise<void> {

  const inputNameConfirm = await input({ message: 'Nome do album que deseja deletar:' })

  if (inputNameConfirm == '') {
    console.log('É preciso informar o nome do album para excluir. ⚠️')
    return
  }
  
  const shouldList = await confirm({ message: `Certeza que deseja excluir ${inputNameConfirm}?` })

  if (!shouldList) {
    console.log('Usuário cancelou a exclusão.')
  }

  return db.deleteAlbum(
    inputNameConfirm
  )
}