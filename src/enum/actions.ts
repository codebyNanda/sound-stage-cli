export enum ArtistsActions {
  CREATEARTIST= 'Criar um novo artista',
  UPDATEARTIST = 'Atualizar informações do artista',
  GETARTISTS = 'Listar todos os artistas',
  GETONEARTIST = 'Buscar por um artista',
  DELETEARTIST = 'Deletar artista',
}

export enum AlbumsActions {
  CREATEALBUM = 'Criar um novo álbum',
  UPDATEALBUM = 'Atualizar informações do álbum',
  GETALBUMS = 'Listar todos os álbuns',
  GETONEALBUM = 'Buscar por um álbum',
  DELETEALBUM = 'Deletar álbum',
  ALBUMSBYARTIST = 'Listar álbuns por artista'
}

export enum StandardActions {
  BACK = 'Voltar ao menu de operações',
  EXIT = 'Sair'
}

export enum Operations {
  ARTIST = 'Interagir com o menu de artistas',
  ALBUM = 'Interagir com o menu de álbuns',
  EXIT = 'Sair'
}
