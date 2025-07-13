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
// import * as inquirer from 'inquirer'
const inquirer_1 = __importDefault(require("inquirer"));
const actions_1 = require("./enum/actions");
const createArtist_1 = require("./libraryOfArtistsCli/createArtist");
const updateArtist_1 = require("./libraryOfArtistsCli/updateArtist");
const getArtist_1 = require("./libraryOfArtistsCli/getArtist");
function firstCli() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Bem-vindo ao meu primeiro CLI!');
        const artists = []; // Armazena os artistas criados
        while (true) {
            let breakLoop = false;
            yield inquirer_1.default.prompt([
                {
                    type: 'list',
                    name: 'library',
                    message: 'Escolha o que deseja realizar nesta biblioteca: ',
                    choices: [actions_1.Actions.CreateArtist, actions_1.Actions.UpdateArtist, actions_1.Actions.GetArtist],
                }
            ])
                .then((answers) => __awaiter(this, void 0, void 0, function* () {
                switch (answers.library) {
                    case actions_1.Actions.CreateArtist:
                        const resultArtist = yield (0, createArtist_1.createArtist)();
                        artists.push(resultArtist);
                        console.log(resultArtist);
                        break;
                    case actions_1.Actions.UpdateArtist:
                        const updating = yield (0, updateArtist_1.updateArtist)(artists);
                        console.log(updating);
                        break;
                    case actions_1.Actions.GetArtist:
                        yield (0, getArtist_1.getArtist)(artists);
                        // console.log(artists)
                        break;
                    default:
                        console.log('Opção errada! Por favor tente novamente.');
                }
            }))
                .catch((err) => console.log(err));
            if (breakLoop)
                break;
        }
    });
}
firstCli();
