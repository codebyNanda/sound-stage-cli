"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicBase = void 0;
class MusicBase {
    constructor(inputBase) {
        this._name = inputBase.name;
        this._genre = inputBase.genre;
        this._country = inputBase.country;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get genre() {
        return this._genre;
    }
    set genre(value) {
        this._genre = value;
    }
    get country() {
        return this._country;
    }
    set country(value) {
        this._country = value;
    }
}
exports.MusicBase = MusicBase;
