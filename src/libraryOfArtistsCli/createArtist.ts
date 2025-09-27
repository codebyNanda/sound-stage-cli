import { input, number } from '@inquirer/prompts'
import { Artist } from "../classes/artist"
import { IDatabaseConnector } from '../interfaces/iDatabaseConnector'

export async function createArtist(db: IDatabaseConnector): Promise<void> {

  const inputName = await input({ message: 'Nome do artista que deseja cadastrar: '})
  
  const inputCountry = await input({ message: 'País: '})

  const inputGenre = await input({ message: 'Estilo musical: '})
  
  const inputRecordLabels = await input({ message: 'Gravadora responsável: '})

  const inputYearOfFoundation = await number({ message: 'Ano de fundação: ', required: true })
  
  const artist = new Artist({
    name: inputName,
    country: inputCountry,
    genre: inputGenre,
  },
  inputRecordLabels,
  inputYearOfFoundation
)

  return db.createArtist(artist)
}