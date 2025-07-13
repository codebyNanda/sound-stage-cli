"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drummer = void 0;
const musicianBase_1 = require("./musicianBase");
class Drummer extends musicianBase_1.MusicianBase {
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
exports.Drummer = Drummer;
