export enum ArtistsActions {
  CreateArtist = 'Criar um novo artista',
  UpdateArtist = 'Atualizar informações do artista',
  GetArtist = 'Listar todos os artistas',
  GetOneArtist = 'Buscar por um artista',
  DeleteArtist = 'Deletar artista',
}

export enum AlbumsActions {
  CreateAlbum = 'Criar um novo álbum',
  UpdateAlbum = 'Atualizar informações do álbum',
  GetAlbum = 'Listar todos os álbuns',
  GetOneAlbum = 'Buscar por um álbum',
  DeleteAlbum = 'Deletar álbum',
  AlbumsByArtist = 'Listar álbuns por artista'
}

export enum StandardActions {
  Back = 'Voltar ao menu de operações',
  Exit = 'Sair'
}

export enum Operations {
  ARTIST = 'Interagir com o menu de artistas',
  ALBUM = 'Interagir com o menu de álbuns',
  EXIT = 'Sair'
}
