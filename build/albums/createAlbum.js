"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAlbum = createAlbum;
const prompts_1 = require("@inquirer/prompts");
const albums_1 = require("../classes/albums");
function createAlbum(db, artistDb) {
    return __awaiter(this, void 0, void 0, function* () {
        const nameArtist = yield (0, prompts_1.input)({ message: 'Nome do artista do álbum que deseja cadastrar: ' });
        // Busca o artista pelo nome para obter o artist_id
        const artist = yield artistDb.getOneArtist(nameArtist);
        if (!artist) {
            console.log('Artista não encontrado! Por favor, cadastre o artista antes de cadastrar o álbum.');
            return;
        }
        const name = yield (0, prompts_1.input)({ message: 'Nome do album que deseja cadastrar: ' });
        const genre = yield (0, prompts_1.input)({ message: 'Gênero: ' });
        const record_label = yield (0, prompts_1.input)({ message: 'Gravadora: ' });
        const tracks = yield (0, prompts_1.number)({ message: 'Número de faixas: ', required: true });
        const year = yield (0, prompts_1.number)({ message: 'Ano de lançamento: ', required: true });
        const album = new albums_1.Album(name, genre, record_label, tracks, year, artist.artist_id);
        return db.createAlbum(album);
    });
}
