import { confirm } from '@inquirer/prompts'
import { IAlbumDatabase } from "../interfaces/iAlbumDatabase"
import { Album } from "../classes/albums"

export async function getAlbums(db: IAlbumDatabase): Promise<Album[]> {

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
       Nome: ${item.name}
       Gênero: ${item.genre}
       Gravadora: ${item.record_label}
       Número de faixas: ${item.tracks}
       Ano de lançamento: ${item.year}
      `
    )
  )
  return albums
}