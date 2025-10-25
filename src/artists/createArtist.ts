import { input, number } from '@inquirer/prompts'
import { Artist } from "../classes/artist"
import { IArtistDatabase } from '../interfaces/iArtistDatabase'

export async function createArtist(db: IArtistDatabase): Promise<void> {

  const inputName = await input({ message: 'Nome do artista que deseja cadastrar: '})
  
  const inputCountry = await input({ message: 'País: '})

  const inputGenre = await input({ message: 'Estilo musical: '})
  
  const inputYearOfFoundation = await number({ message: 'Ano de fundação: ', required: true })
  
  const artist = new Artist({
    name: inputName,
    country: inputCountry,
    genre: inputGenre,
  },
  inputYearOfFoundation
)

  return db.createArtist(artist)
}