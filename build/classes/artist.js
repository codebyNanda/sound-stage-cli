"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artist = void 0;
const musicBase_1 = require("./musicBase");
class Artist extends musicBase_1.MusicBase {
    constructor(inputBase, year_of_foundation, artist_id) {
        super(inputBase);
        this._year_of_foundation = year_of_foundation;
        this.artist_id = artist_id;
    }
    get year_of_foundation() {
        return this._year_of_foundation;
    }
    set year_of_foundation(value) {
        this._year_of_foundation = value;
    }
}
exports.Artist = Artist;
