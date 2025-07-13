"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guitarist = void 0;
const musicianBase_1 = require("./musicianBase");
class Guitarist extends musicianBase_1.MusicianBase {
    constructor(inputBase, inputMusicianBase, bandsHasPlayedIn) {
        super(inputBase, inputMusicianBase);
        this._bandsHasPlayedIn = bandsHasPlayedIn;
    }
    get bandsHasPlayedIn() {
        return this._bandsHasPlayedIn;
    }
    set bandsHasPlayedIn(value) {
        this._bandsHasPlayedIn = value;
    }
    compositions() {
        console.log('Composições :: ');
    }
}
exports.Guitarist = Guitarist;
