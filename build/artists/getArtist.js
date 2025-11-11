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
exports.getArtist = getArtist;
const prompts_1 = require("@inquirer/prompts");
function getArtist(db) {
    return __awaiter(this, void 0, void 0, function* () {
        const shouldList = yield (0, prompts_1.confirm)({
            message: 'Deseja listar todos os artistas cadastrados na Sound Stage Library?',
        });
        if (!shouldList) {
            console.log('Usuário cancelou a listagem');
            return [];
        }
        const artists = yield db.getArtist();
        console.log('🎵 Artistas em Sound Stage Library: ');
        artists.forEach(item => console.log(`
       Nome: ${item.name}
       País: ${item.country}
       Estilo Musical: ${item.genre}
       Ano de fundação: ${item.year_of_foundation}
      `));
        return artists;
    });
}
