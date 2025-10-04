import { input, rawlist } from '@inquirer/prompts'
import { IAlbumDatabase } from '../interfaces/iAlbumDatabase'
import { Albums } from '../classes/albums'

export async function updateAlbum(db: IAlbumDatabase): Promise<void> {

  const inputName = await input({ message: 'Nome do álbum que deseja atualizar: '})

   const choices = [
      { name: 'Gênero', value: 'genre_of_album' },
      { name: 'Gravadora', value: 'record_label' },
      { name: 'Número de faixas', value: 'number_of_tracks' },
      { name: 'Ano de lançamento', value: 'year' },
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

  if (field === 'number_of_tracks') {
    newValue = Number(newValue)
  }

  if (field === 'year') {
    newValue = Number(newValue)
  }

  const updateData: Partial<Albums> = {
    nameOfAlbum: inputName,
    [field]: newValue
  }

  return db.updateAlbum(updateData)
}