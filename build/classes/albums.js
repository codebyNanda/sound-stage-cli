"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
class Album {
    constructor(name, genre, record_label, tracks, year, artist_id) {
        this.name = name;
        this.genre = genre;
        this.record_label = record_label;
        this.tracks = tracks;
        this.year = year;
        this.artist_id = artist_id;
    }
}
exports.Album = Album;
