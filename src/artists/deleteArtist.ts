import { confirm, input } from '@inquirer/prompts'
import { IArtistDatabase } from '../interfaces/iArtistDatabase'

export async function deleteArtist(db: IArtistDatabase): Promise<void> {

  const inputNameConfirm = await input({ message: 'Nome do artista que deseja deletar:' })

  if (inputNameConfirm == '') {
    console.log('É preciso informar o nome do artista para excluir. ⚠️')
    return
  }
  
  const shouldList = await confirm({ message: `Certeza que deseja excluir ${inputNameConfirm}?` })

  if (!shouldList) {
    console.log('Usuário cancelou a exclusão.')
  }

  return db.deleteArtist(
    inputNameConfirm
  )
}