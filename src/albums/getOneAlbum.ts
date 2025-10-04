import { Albums } from "../classes/albums"
import { IAlbumDatabase } from "../interfaces/iAlbumDatabase"
import { input } from '@inquirer/prompts'

export async function getOneAlbum(db: IAlbumDatabase): Promise<Albums | null> {

  const inputName = await input({ message: 'Nome do álbum que deseja procurar: '})

   if (!inputName) {
    console.log('É necessário o nome para a busca do álbum. ⚠️')
    return null
  }

  const album = await db.getOneAlbum(inputName)
  console.log(`
    🎵 Álbum: 

    Nome: ${album?.nameOfAlbum}
    Gênero: ${album?.genreOfAlbum}
    Gravadora: ${album?.recordLabel}
    Número de faixas: ${album?.numberOfTracks}
    Ano de lançamento: ${album?.year}
  `)

  return album
}