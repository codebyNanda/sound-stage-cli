import { Artist } from "../classes/artist"
import { input } from '@inquirer/prompts'
import { IArtistDatabase } from "../interfaces/iArtistDatabase"

export async function getOneArtist(db: IArtistDatabase): Promise<Artist | null> {

  const inputName = await input({ message: 'Nome do artista que deseja procurar: '})

   if (!inputName) {
    console.log('É necessário o nome para a busca do artista. ⚠️')
    return null
  }

  const artist = await db.getOneArtist(inputName)

  if (!artist) {
    console.log('Artista não encontrado em Sound Stage CLI.')
    return null
  }

  console.log(`
    🎵 Artista: 

    Nome: ${artist?.name}
    País: ${artist?.country}
    Estilo Musical: ${artist?.genre}
    Ano de fundação: ${artist?.year_of_foundation}
  `)

  return artist
}