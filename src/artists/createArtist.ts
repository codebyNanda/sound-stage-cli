import { input, number } from '@inquirer/prompts'
import { Artist } from "../classes/artist"
import { IArtistDatabase } from '../interfaces/iArtistDatabase'

export async function createArtist(db: IArtistDatabase): Promise<void> {

  const name = await input({ message: 'Nome do artista que deseja cadastrar: '})
  
  const country = await input({ message: 'País: '})

  const genre = await input({ message: 'Estilo musical: '})
  
  const yearOfFoundation = await number({ message: 'Ano de fundação: ', required: true })
  
  const artist = new Artist({
    name: name,
    country: country,
    genre: genre,
  },
  yearOfFoundation
)

  return db.createArtist(artist)
}