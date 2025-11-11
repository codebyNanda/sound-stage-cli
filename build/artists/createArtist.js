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
exports.createArtist = createArtist;
const prompts_1 = require("@inquirer/prompts");
const artist_1 = require("../classes/artist");
function createArtist(db) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputName = yield (0, prompts_1.input)({ message: 'Nome do artista que deseja cadastrar: ' });
        const inputCountry = yield (0, prompts_1.input)({ message: 'País: ' });
        const inputGenre = yield (0, prompts_1.input)({ message: 'Estilo musical: ' });
        const inputYearOfFoundation = yield (0, prompts_1.number)({ message: 'Ano de fundação: ', required: true });
        const artist = new artist_1.Artist({
            name: inputName,
            country: inputCountry,
            genre: inputGenre,
        }, inputYearOfFoundation);
        return db.createArtist(artist);
    });
}
