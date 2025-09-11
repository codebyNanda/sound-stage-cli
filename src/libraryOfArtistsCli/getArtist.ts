import { Artist } from "../classes/artist"
import { confirm } from '@inquirer/prompts'
import { IDatabaseConnector } from "../interfaces/iDatabaseConnector"

export async function getArtist(db: IDatabaseConnector): Promise<Artist[]> {
   const shouldList = await confirm({
    message: 'Deseja listar todos os artistas cadastrados na Sound Stage Library?',
  })

  if (!shouldList) {
    console.log('Usuário cancelou a listagem')
    return []
  }

  const artists = await db.getArtist()
  console.log('Artistas retornados:', artists)
  return artists
}