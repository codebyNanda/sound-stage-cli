"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Albums = void 0;
const musicBase_1 = require("./musicBase");
class Albums extends musicBase_1.MusicBase {
    constructor(inputBase, nameofAlbum, year, numberOfTracks, recordLabel) {
        super(inputBase);
        this.nameofAlbum = nameofAlbum;
        this.year = year;
        this.numberOfTracks = numberOfTracks;
        this.recordLabel = recordLabel;
    }
    play() {
        console.log('We are Defenders of the Faith!');
    }
    composedBy() {
        console.log('Composição por :: ');
    }
    lyrics() {
        console.log('Letras de todas as faixas do álbum :: ');
    }
}
exports.Albums = Albums;
