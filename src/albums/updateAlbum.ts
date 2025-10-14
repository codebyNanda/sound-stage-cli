import { input, rawlist } from '@inquirer/prompts'
import { IAlbumDatabase } from '../interfaces/iAlbumDatabase'
import { Album } from '../classes/albums'

export async function updateAlbum(db: IAlbumDatabase): Promise<void> {

  const inputName = await input({ message: 'Nome do álbum que deseja atualizar: '})

   const choices = [
      { name: 'Gênero', value: 'genre' },
      { name: 'Gravadora', value: 'record_label' },
      { name: 'Número de faixas', value: 'tracks' },
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

  if (field === 'tracks') {
    newValue = Number(newValue)
  }

  if (field === 'year') {
    newValue = Number(newValue)
  }

  const updateData: Partial<Album> = {
    name: inputName,
    [field]: newValue
  }

  return db.updateAlbum(updateData)
}