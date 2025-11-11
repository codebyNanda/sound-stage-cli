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
exports.updateArtist = updateArtist;
const prompts_1 = require("@inquirer/prompts");
function updateArtist(db) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputName = yield (0, prompts_1.input)({ message: 'Nome do artista que deseja atualizar: ' });
        const choices = [
            { name: 'País', value: 'country' },
            { name: 'Estilo musical', value: 'genre' },
            { name: 'Ano de fundação', value: 'year_of_foundation' },
            { name: 'Voltar ao menu inicial', value: 'back' },
        ];
        const field = yield (0, prompts_1.rawlist)({
            message: 'Selecione a informação que deseja atualizar: ',
            choices
        });
        const updatingOptions = new Map(choices.map(choice => [choice.value, choice.name]));
        if (field == 'back') {
            return;
        }
        let newValue = yield (0, prompts_1.input)({
            message: `Digite o novo valor para ${updatingOptions.get(field)}: `
        });
        if (field === 'year_of_foundation') {
            newValue = Number(newValue);
        }
        const updateData = {
            name: inputName,
            [field]: newValue
        };
        return db.updateArtist(updateData);
    });
}
