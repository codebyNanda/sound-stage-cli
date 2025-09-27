import { input, rawlist } from '@inquirer/prompts'
import { Artist } from "../classes/artist"
import { IDatabaseConnector } from '../interfaces/iDatabaseConnector'

export async function updateArtist(db: IDatabaseConnector): Promise<void> {

  const inputName = await input({ message: 'Nome do artista que deseja atualizar: '})

   const choices = [
      { name: 'País', value: 'country' },
      { name: 'Estilo musical', value: 'genre' },
      { name: 'Gravadora', value: 'record_labels' },
      { name: 'Ano de fundação', value: 'year_of_foundation' },
      { name: 'Voltar ao menu inicial', value: 'back' },
    ]

  const field = await rawlist({
    message: 'Selecione a informação que deseja atualizar: ',
    choices
  })

  const updatingOptions = new Map(
    choices.map(choice => [choice.value, choice.name])
  )

  if (field == 'back') {
    return
  }

  let newValue: string | number = await input({
    message: `Digite o novo valor para ${updatingOptions.get(field)}: `
  })

  if (field === 'year_of_foundation') {
    newValue = Number(newValue)
  }

  const updateData: Partial<Artist> = {
    name: inputName,
    [field]: newValue
  }

  return db.updateArtist(updateData)
}