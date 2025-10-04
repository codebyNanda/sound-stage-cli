import { confirm } from '@inquirer/prompts'
import { IAlbumDatabase } from "../interfaces/iAlbumDatabase"
import { Albums } from "../classes/albums"

export async function getAlbums(db: IAlbumDatabase): Promise<Albums[]> {

   const shouldList = await confirm({
    message: 'Deseja listar todos os álbuns cadastrados na Sound Stage Library?',
  })

  if (!shouldList) {
    console.log('Usuário cancelou a listagem')
    return []
  }

  const albums = await db.getAlbums()
  console.log('🎵 Álbuns em Sound Stage Library: ')
  albums.forEach(item => 
    console.log(
      `
       Nome: ${item.nameOfAlbum}
       Gênero: ${item.genreOfAlbum}
       Gravadora: ${item.recordLabel}
       Número de faixas: ${item.numberOfTracks}
       Ano de lançamento: ${item.year}
      `
    )
  )
  return albums
}