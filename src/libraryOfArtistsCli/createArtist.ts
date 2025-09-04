import { input, number } from '@inquirer/prompts'
import { Artist } from "../classes/artist"
import { IDatabaseConnector } from '../interfaces/iDatabaseConnector'

export async function createArtist(db: IDatabaseConnector) {

  const inputName = await input({ message: 'Nome do artista/banda que deseja cadastrar: '})
  
  const inputCountry = await input({ message: 'País: '})

  const inputGenre = await input({ message: 'Estilo: '})
  
  const inputRecordLabels = await input({ message: 'Digite a gravadora responsável: '})

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