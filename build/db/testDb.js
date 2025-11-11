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
const artist_1 = require("../classes/artist");
const DbSqliteAlbums_1 = require("./DbSqliteAlbums");
const DbSqliteArtist_1 = require("./DbSqliteArtist");
function testeDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = new DbSqliteAlbums_1.DbSqliteAlbums();
        const dbArtist = new DbSqliteArtist_1.DbSqliteArtist();
        dbArtist.createArtist(new artist_1.Artist({
            name: 'Candlemass',
            country: 'Suécia',
            genre: 'Doom Metal'
        }, 1985));
        // const artists = await db.getArtist()
        // console.log(artists)
        // db.updateArtist({
        //   genre: 'Random',
        //   country: 'Brazil',
        //   name: 'Teste 4',
        //   // record_labels: 'Teste',
        //   // year_of_foundation:0
        // })
        // db.deleteArtist({
        //   name: 'Teste 3'
        // })
        // const artist = await db.getOneArtist('Candlemass')
        // console.log(artist)
    });
}
testeDb();
