import { input, number } from '@inquirer/prompts'
import { IAlbumDatabase } from '../interfaces/iAlbumDatabase'
import { Album } from '../classes/albums'
import { IArtistDatabase } from '../interfaces/iArtistDatabase'

export async function createAlbum(db: IAlbumDatabase, artistDb: IArtistDatabase): Promise<void> {

  const nameArtist = await input({ message: 'Nome do artista do álbum que deseja cadastrar: '})

  // Busca o artista pelo nome para obter o artist_id
  const artist = await artistDb.getOneArtist(nameArtist)
  
  if (!artist) {
    console.log('Artista não encontrado! Por favor, cadastre o artista antes de cadastrar o álbum.')
    return
  }

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
    year,
    artist.artist_id
  )

  return db.createAlbum(album)
}