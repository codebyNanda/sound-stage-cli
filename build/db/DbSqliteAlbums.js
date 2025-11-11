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
exports.DbSqliteAlbums = void 0;
const albums_1 = require("../classes/albums");
const DbSqliteBase_1 = require("./DbSqliteBase");
class DbSqliteAlbums extends DbSqliteBase_1.DbSqliteBase {
    constructor() {
        super();
    }
    createAlbum(album) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!DbSqliteBase_1.DbSqliteBase.hasBeenInitialized) {
                yield this.init();
                DbSqliteBase_1.DbSqliteBase.hasBeenInitialized = true;
            }
            return new Promise((resolve, reject) => {
                this.db.run(`INSERT INTO albums (name, genre, record_label, tracks, year, artist_id) 
        VALUES (?, ?, ?, ?, ?, ?)`, [
                    album.name,
                    album.genre,
                    album.record_label,
                    album.tracks,
                    album.year,
                    album.artist_id
                ], (err) => {
                    if (err) {
                        console.error('Erro ao inserir album', err.message);
                        return reject(err);
                    }
                    console.log('Album inserido com sucesso! 🔥');
                    resolve();
                });
            });
        });
    }
    getAlbums() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!DbSqliteBase_1.DbSqliteBase.hasBeenInitialized) {
                yield this.init();
                DbSqliteBase_1.DbSqliteBase.hasBeenInitialized = true;
            }
            return new Promise((resolve, reject) => {
                this.db.all(`SELECT * FROM albums`, (err, rows) => {
                    if (err)
                        return reject(err);
                    if (!rows || rows.length === 0) {
                        console.log('Nenhum album encontrado.');
                        return resolve([]);
                    }
                    const albums = rows.map(row => new albums_1.Album(row.name, row.genre, row.record_label, row.tracks, row.year));
                    resolve(albums);
                });
            });
        });
    }
    updateAlbum(album) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!DbSqliteBase_1.DbSqliteBase.hasBeenInitialized) {
                yield this.init();
                DbSqliteBase_1.DbSqliteBase.hasBeenInitialized = true;
            }
            if (!album.name) {
                throw new Error('Nome do album é obrigatório para atualizar. ⚠️');
            }
            const { query, values } = this.generateUpdateQuery(album);
            return new Promise((resolve, reject) => {
                this.db.run(query, values, (err) => {
                    if (err)
                        return reject(err);
                    console.log('Album atualizado com sucesso!');
                    resolve();
                });
            });
        });
    }
    deleteAlbum(nameOfAlbum) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!DbSqliteBase_1.DbSqliteBase.hasBeenInitialized) {
                yield this.init();
                DbSqliteBase_1.DbSqliteBase.hasBeenInitialized = true;
            }
            return new Promise((resolve, reject) => {
                this.db.run(`DELETE FROM albums
         WHERE name = ?`, [nameOfAlbum], (err) => {
                    if (err)
                        return reject(err);
                    console.log('Album deletado com sucesso.');
                    resolve();
                });
            });
        });
    }
    getOneAlbum(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!DbSqliteBase_1.DbSqliteBase.hasBeenInitialized) {
                yield this.init();
                DbSqliteBase_1.DbSqliteBase.hasBeenInitialized = true;
            }
            return new Promise((resolve, reject) => {
                this.db.get(`SELECT * FROM albums WHERE name= ?`, [name], (err, row) => {
                    if (err)
                        return reject(err);
                    if (!row)
                        return resolve(null);
                    const album = new albums_1.Album(row.name, row.genre, row.record_label, row.tracks, row.year);
                    resolve(album);
                });
            });
        });
    }
    generateUpdateQuery(album) {
        const fields = [];
        const values = [];
        if (album.name) {
            fields.push('name = ?');
            values.push(album.name);
        }
        if (album.genre) {
            fields.push('genre = ?');
            values.push(album.genre);
        }
        if (album.record_label) {
            fields.push('record_label = ?');
            values.push(album.record_label);
        }
        if (album.tracks) {
            fields.push('tracks = ?');
            values.push(album.tracks);
        }
        if (album.year) {
            fields.push('year = ?');
            values.push(album.year);
        }
        if (fields.length === 0) {
            throw new Error('Nenhum campo para atualizar foi informado.');
        }
        const query = `
        UPDATE albums
        SET ${fields.join(', ')}
        WHERE name = ?
      `;
        values.push(album.name);
        return { query, values };
    }
}
exports.DbSqliteAlbums = DbSqliteAlbums;
