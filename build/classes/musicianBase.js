"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicianBase = void 0;
const musicBase_1 = require("./musicBase");
class MusicianBase extends musicBase_1.MusicBase {
    constructor(inputBase, inputMusicianBase) {
        super(inputBase);
        this._albumsInPartnership = inputMusicianBase.albumsInPartnership;
    }
    get albumsInPartnership() {
        return this._albumsInPartnership;
    }
    set albumsInPartnership(value) {
        this._albumsInPartnership = value;
    }
}
exports.MusicianBase = MusicianBase;
