import { input, rawlist } from '@inquirer/prompts'
import { Artist } from "../classes/artist"
import { IArtistDatabase } from '../interfaces/iArtistDatabase'


export async function updateArtist(db: IArtistDatabase): Promise<void> {

  const inputName = await input({ message: 'Nome do artista que deseja atualizar: '})

   const choices = [
      { name: 'País', value: 'country' },
      { name: 'Estilo musical', value: 'genre' },
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