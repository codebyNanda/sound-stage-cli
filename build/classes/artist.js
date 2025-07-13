"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artist = void 0;
const musicBase_1 = require("./musicBase");
class Artist extends musicBase_1.MusicBase {
    constructor(inputBase, recordLabels, yearOfFundation) {
        super(inputBase);
        this._recordLabels = recordLabels;
        this._yearOfFundation = yearOfFundation;
    }
    get recordLabels() {
        return this._recordLabels;
    }
    set recordLabels(value) {
        this._recordLabels = value;
    }
    get yearOfFundation() {
        return this._yearOfFundation;
    }
    set yearOfFundation(value) {
        this._yearOfFundation = value;
    }
    addRecordLabel() {
        console.log('Adicionando gravadora :: ');
    }
}
exports.Artist = Artist;
