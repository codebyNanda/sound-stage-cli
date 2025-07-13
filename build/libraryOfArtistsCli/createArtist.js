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
function createArtist() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputName = yield (0, prompts_1.input)({ message: 'Informe o nome do artista ou banda que deseja cadastrar: ' });
        const inputCountry = yield (0, prompts_1.input)({ message: 'País: ' });
        const inputGenre = yield (0, prompts_1.input)({ message: 'Qual o estilo de música? ' });
        const inputRecordLabels = yield (0, prompts_1.input)({ message: 'Digite a gravadora responsável: ' });
        const creatingArtistData = new artist_1.Artist({
            name: inputName,
            genre: inputGenre,
            country: inputCountry,
        }, inputRecordLabels);
        return creatingArtistData;
    });
}
