import { Album } from "../classes/albums"
import { input } from '@inquirer/prompts'
import { IAlbumDatabase } from "../interfaces/iAlbumDatabase"

export async function getAlbumsByArtist(db: IAlbumDatabase): Promise<Album[]> {

  const artistName = await input({ message: 'Nome do artista para buscar álbuns: '})

  if (!artistName) {
    console.log('É necessário o nome do artista para a busca. ⚠️')
    return []
  }

  const albums = await db.findAllAlbumsByArtist(artistName)
  
  if (albums.length > 0) {
    console.log(`\n🎵 Álbuns do artista "${artistName}": \n`)
    albums.forEach(album => 
      console.log(
        `
         Nome: ${album.name}
         Gênero: ${album.genre}
         Gravadora: ${album.record_label}
         Faixas: ${album.tracks}
         Ano: ${album.year}
        `
      )
    )
  }

  return albums
}
