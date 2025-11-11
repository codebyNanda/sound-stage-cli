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
exports.artistsCli = artistsCli;
const inquirer_1 = __importDefault(require("inquirer"));
const actions_1 = require("./enum/actions");
const createArtist_1 = require("./artists/createArtist");
const updateArtist_1 = require("./artists/updateArtist");
const getArtist_1 = require("./artists/getArtist");
const DbSqliteArtist_1 = require("./db/DbSqliteArtist");
const deleteArtist_1 = require("./artists/deleteArtist");
const getOneArtist_1 = require("./artists/getOneArtist");
const cli_1 = require("./cli");
function artistsCli() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🔥 Bem-vindo ao menu de artistas! 🔥');
        const db = new DbSqliteArtist_1.DbSqliteArtist();
        while (true) {
            yield inquirer_1.default.prompt([
                {
                    type: 'list',
                    name: 'artistsCli',
                    message: 'O que deseja fazer? ',
                    choices: [
                        actions_1.ArtistsActions.CreateArtist,
                        actions_1.ArtistsActions.UpdateArtist,
                        actions_1.ArtistsActions.GetArtist,
                        actions_1.ArtistsActions.DeleteArtist,
                        actions_1.ArtistsActions.GetOneArtist,
                        actions_1.StandardActions.Back,
                        actions_1.StandardActions.Exit
                    ],
                }
            ])
                .then((answers) => __awaiter(this, void 0, void 0, function* () {
                switch (answers.artistsCli) {
                    case actions_1.ArtistsActions.CreateArtist:
                        yield (0, createArtist_1.createArtist)(db);
                        break;
                    case actions_1.ArtistsActions.UpdateArtist:
                        yield (0, updateArtist_1.updateArtist)(db);
                        break;
                    case actions_1.ArtistsActions.GetArtist:
                        yield (0, getArtist_1.getArtist)(db);
                        break;
                    case actions_1.ArtistsActions.DeleteArtist:
                        yield (0, deleteArtist_1.deleteArtist)(db);
                        break;
                    case actions_1.ArtistsActions.GetOneArtist:
                        yield (0, getOneArtist_1.getOneArtist)(db);
                        break;
                    case actions_1.StandardActions.Back:
                        yield (0, cli_1.firstCli)();
                        break;
                    case actions_1.StandardActions.Exit:
                        process.exit(0);
                    default:
                        console.log('Opção errada! Por favor tente novamente.');
                }
            }))
                .catch((err) => console.log(err));
        }
    });
}
