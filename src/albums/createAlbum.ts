import { input, number } from '@inquirer/prompts'
import { IAlbumDatabase } from '../interfaces/iAlbumDatabase'
import { Album } from '../classes/albums'

export async function createAlbum(db: IAlbumDatabase): Promise<void> {

  const name = await input({ message: 'Nome do album que deseja cadastrar: '})

  const genre = await input({ message: 'Gênero: '})

  const record_label = await input({ message: 'Gravadora: '})

  const tracks = await number({ message: 'Número de faixas: ', required: true })

  const year = await number({ message: 'Ano de lançamento: ', required: true })


  const album = new Album(
    name,
    genre,
    record_label,
    tracks,
    year
  )

  return db.createAlbum(album)
}