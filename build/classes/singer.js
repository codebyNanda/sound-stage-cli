"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singer = void 0;
const musicianBase_1 = require("./musicianBase");
class Singer extends musicianBase_1.MusicianBase {
    constructor(inputBase, inputMusicianBase, bandsHasSungIn) {
        super(inputBase, inputMusicianBase);
        this._bandsHasSungIn = bandsHasSungIn;
    }
    get bandsHasSungIn() {
        return this._bandsHasSungIn;
    }
    set bandsHasSungIn(value) {
        this._bandsHasSungIn = value;
    }
    compositions() {
        console.log('Composições :: ');
    }
}
exports.Singer = Singer;
