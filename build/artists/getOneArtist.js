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
exports.getOneArtist = getOneArtist;
const prompts_1 = require("@inquirer/prompts");
function getOneArtist(db) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputName = yield (0, prompts_1.input)({ message: 'Nome do artista que deseja procurar: ' });
        if (!inputName) {
            console.log('É necessário o nome para a busca do artista. ⚠️');
            return null;
        }
        const artist = yield db.getOneArtist(inputName);
        console.log(`
    🎵 Artista: 

    Nome: ${artist === null || artist === void 0 ? void 0 : artist.name}
    País: ${artist === null || artist === void 0 ? void 0 : artist.country}
    Estilo Musical: ${artist === null || artist === void 0 ? void 0 : artist.genre}
    Ano de fundação: ${artist === null || artist === void 0 ? void 0 : artist.year_of_foundation}
  `);
        return artist;
    });
}
