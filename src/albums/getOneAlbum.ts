import { Album } from "../classes/albums"
import { IAlbumDatabase } from "../interfaces/iAlbumDatabase"
import { input } from '@inquirer/prompts'

export async function getOneAlbum(db: IAlbumDatabase): Promise<Album | null> {

  const inputName = await input({ message: 'Nome do álbum que deseja procurar: '})

   if (!inputName) {
    console.log('É necessário o nome para a busca do álbum. ⚠️')
    return null
  }

  const album = await db.getOneAlbum(inputName)

  if (!album) {
    console.log('Álbum não encontrado em Sound Stage Library.')
    return null
  }

  console.log(`
    🎵 Álbum: 

    Nome: ${album?.name}
    Gênero: ${album?.genre}
    Gravadora: ${album?.record_label}
    Número de faixas: ${album?.tracks}
    Ano de lançamento: ${album?.year}
  `)

  return album
}