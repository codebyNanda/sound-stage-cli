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
exports.getOneAlbum = getOneAlbum;
const prompts_1 = require("@inquirer/prompts");
function getOneAlbum(db) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputName = yield (0, prompts_1.input)({ message: 'Nome do álbum que deseja procurar: ' });
        if (!inputName) {
            console.log('É necessário o nome para a busca do álbum. ⚠️');
            return null;
        }
        const album = yield db.getOneAlbum(inputName);
        console.log(`
    🎵 Álbum: 

    Nome: ${album === null || album === void 0 ? void 0 : album.name}
    Gênero: ${album === null || album === void 0 ? void 0 : album.genre}
    Gravadora: ${album === null || album === void 0 ? void 0 : album.record_label}
    Número de faixas: ${album === null || album === void 0 ? void 0 : album.tracks}
    Ano de lançamento: ${album === null || album === void 0 ? void 0 : album.year}
  `);
        return album;
    });
}
