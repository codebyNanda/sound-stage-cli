import { input, number } from '@inquirer/prompts'
import { IAlbumDatabase } from '../interfaces/iAlbumDatabase'
import { Albums } from '../classes/albums'

export async function createAlbum(db: IAlbumDatabase): Promise<void> {

  const nameOfAlbum = await input({ message: 'Nome do album que deseja cadastrar: '})
  
  const genreOfAlbum = await input({ message: 'Gênero: '})
  
  const recordLabel = await input({ message: 'Gravadora: '})

  const numberOfTracks = await number({ message: 'Número de faixas: ', required: true })

  const year = await number({ message: 'Ano de lançamento: ', required: true })

  
  const album = new Albums(
    nameOfAlbum,
    genreOfAlbum,
    recordLabel,
    numberOfTracks,
    year
  )

  return db.createAlbum(album)
}