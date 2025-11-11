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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstCli = firstCli;
const inquirer_1 = __importDefault(require("inquirer"));
const actions_1 = require("./enum/actions");
const albumsCli_1 = require("./albumsCli");
const artistsCli_1 = require("./artistsCli");
function firstCli() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🔥 Bem-vindo a Sound Stage Library CLI! 🔥');
        while (true) {
            yield inquirer_1.default.prompt([
                {
                    type: 'list',
                    name: 'soundStagelibrary',
                    message: 'O que deseja fazer? ',
                    choices: [
                        actions_1.Operations.ARTIST,
                        actions_1.Operations.ALBUM,
                        actions_1.Operations.EXIT
                    ],
                }
            ])
                .then((answers) => __awaiter(this, void 0, void 0, function* () {
                switch (answers.soundStagelibrary) {
                    case actions_1.Operations.ARTIST:
                        console.log('Você está na seção de artistas. Por favor, escolha uma ação.');
                        yield (0, artistsCli_1.artistsCli)();
                        break;
                    case actions_1.Operations.ALBUM:
                        console.log('Você está na seção de álbuns. Por favor, escolha uma ação.');
                        yield (0, albumsCli_1.albumsCli)();
                        break;
                    case actions_1.Operations.EXIT:
                        process.exit(0);
                    default:
                        console.log('Opção errada! Por favor tente novamente.');
                }
            }))
                .catch((err) => console.log(err));
        }
    });
}
firstCli();
