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
exports.albumsCli = albumsCli;
const inquirer_1 = __importDefault(require("inquirer"));
const DbSqliteAlbums_1 = require("./db/DbSqliteAlbums");
const DbSqliteArtist_1 = require("./db/DbSqliteArtist");
const actions_1 = require("./enum/actions");
const createAlbum_1 = require("./albums/createAlbum");
const getOneAlbum_1 = require("./albums/getOneAlbum");
const deleteAlbum_1 = require("./albums/deleteAlbum");
const updateAlbum_1 = require("./albums/updateAlbum");
const getAlbums_1 = require("./albums/getAlbums");
const cli_1 = require("./cli");
function albumsCli() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🔥 Bem-vindo ao menu de albuns! 🔥');
        const db = new DbSqliteAlbums_1.DbSqliteAlbums();
        const artistDb = new DbSqliteArtist_1.DbSqliteArtist();
        while (true) {
            yield inquirer_1.default.prompt([
                {
                    type: 'list',
                    name: 'albumsCli',
                    message: 'O que deseja fazer? ',
                    choices: [
                        actions_1.AlbumsActions.CreateAlbum,
                        actions_1.AlbumsActions.UpdateAlbum,
                        actions_1.AlbumsActions.GetAlbum,
                        actions_1.AlbumsActions.DeleteAlbum,
                        actions_1.AlbumsActions.GetOneAlbum,
                        actions_1.StandardActions.Back,
                        actions_1.StandardActions.Exit
                    ],
                }
            ])
                .then((answers) => __awaiter(this, void 0, void 0, function* () {
                switch (answers.albumsCli) {
                    case actions_1.AlbumsActions.CreateAlbum:
                        yield (0, createAlbum_1.createAlbum)(db, artistDb);
                        break;
                    case actions_1.AlbumsActions.UpdateAlbum:
                        yield (0, updateAlbum_1.updateAlbum)(db);
                        break;
                    case actions_1.AlbumsActions.GetAlbum:
                        yield (0, getAlbums_1.getAlbums)(db);
                        break;
                    case actions_1.AlbumsActions.DeleteAlbum:
                        yield (0, deleteAlbum_1.deleteAlbum)(db);
                        break;
                    case actions_1.AlbumsActions.GetOneAlbum:
                        yield (0, getOneAlbum_1.getOneAlbum)(db);
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
