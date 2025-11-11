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
exports.deleteArtist = deleteArtist;
const prompts_1 = require("@inquirer/prompts");
function deleteArtist(db) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputNameConfirm = yield (0, prompts_1.input)({ message: 'Nome do artista que deseja deletar:' });
        if (inputNameConfirm == '') {
            console.log('É preciso informar o nome do artista para excluir. ⚠️');
            return;
        }
        const shouldList = yield (0, prompts_1.confirm)({ message: `Certeza que deseja excluir ${inputNameConfirm}?` });
        if (!shouldList) {
            console.log('Usuário cancelou a exclusão.');
        }
        return db.deleteArtist(inputNameConfirm);
    });
}
