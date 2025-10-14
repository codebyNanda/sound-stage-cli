import { Artist } from "../classes/artist"
import { IDatabaseConnector } from "../interfaces/iDatabaseConnector"
import { input } from '@inquirer/prompts'

export async function getOneArtist(db: IDatabaseConnector): Promise<Artist | null> {

  const inputName = await input({ message: 'Nome do artista que deseja procurar: '})

   if (!inputName) {
    console.log('É necessário o nome para a busca do artista. ⚠️')
    return null
  }

  const artist = await db.getOneArtist(inputName)
  console.log(`
    🎵 Artista: 

    Nome: ${artist?.name}
    País: ${artist?.country}
    Estilo Musical: ${artist?.genre}
    Ano de fundação: ${artist?.year_of_foundation}
  `)

  return artist
}