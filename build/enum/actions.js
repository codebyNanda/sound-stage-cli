"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operations = exports.StandardActions = exports.AlbumsActions = exports.ArtistsActions = void 0;
var ArtistsActions;
(function (ArtistsActions) {
    ArtistsActions["CreateArtist"] = "Criar um novo artista";
    ArtistsActions["UpdateArtist"] = "Atualizar informa\u00E7\u00F5es do artista";
    ArtistsActions["GetArtist"] = "Listar todos os artistas";
    ArtistsActions["GetOneArtist"] = "Buscar por um artista";
    ArtistsActions["DeleteArtist"] = "Deletar artista";
})(ArtistsActions || (exports.ArtistsActions = ArtistsActions = {}));
var AlbumsActions;
(function (AlbumsActions) {
    AlbumsActions["CreateAlbum"] = "Criar um novo \u00E1lbum";
    AlbumsActions["UpdateAlbum"] = "Atualizar informa\u00E7\u00F5es do \u00E1lbum";
    AlbumsActions["GetAlbum"] = "Listar todos os \u00E1lbuns";
    AlbumsActions["GetOneAlbum"] = "Buscar por um \u00E1lbum";
    AlbumsActions["DeleteAlbum"] = "Deletar \u00E1lbum";
})(AlbumsActions || (exports.AlbumsActions = AlbumsActions = {}));
var StandardActions;
(function (StandardActions) {
    StandardActions["Back"] = "Voltar ao menu de opera\u00E7\u00F5es";
    StandardActions["Exit"] = "Sair";
})(StandardActions || (exports.StandardActions = StandardActions = {}));
var Operations;
(function (Operations) {
    Operations["ARTIST"] = "Interagir com o menu de artistas";
    Operations["ALBUM"] = "Interagir com o menu de \u00E1lbuns";
    Operations["EXIT"] = "Sair";
})(Operations || (exports.Operations = Operations = {}));
