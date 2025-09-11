import { input, rawlist, select } from '@inquirer/prompts'
import { Artist } from "../classes/artist"
import { createArtist } from './createArtist'
import { IDatabaseConnector } from '../interfaces/iDatabaseConnector'

export async function updateArtist(db: IDatabaseConnector) {

  const inputName = await input({ message: 'Nome do artista/banda que deseja atualizar: '})

  const field = await rawlist({
    message: 'Selecione a informação que deseja atualizar: ',
    choices: [
      { name: 'País', value: 'country' },
      { name: 'Gênero musical', value: 'genre' },
      { name: 'Gravadora', value: 'record_labels' },
      { name: 'Ano de fundação', value: 'year_of_foundation' },
    ],
  });

  let newValue: string | number = await input({
    message: `Digite o novo valor para ${field}: `
  })

  if (field === 'year_of_foundation') {
    newValue = Number(newValue)
  }

  const updateData: Partial<Artist> = {
    name: inputName,
    [field]: newValue
  }


  console.log('Artista/banda atualizado!', updateData)
  return db.updateArtist(updateData)
}