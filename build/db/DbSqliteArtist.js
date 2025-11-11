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
exports.DbSqliteArtist = void 0;
const artist_1 = require("../classes/artist");
const DbSqliteBase_1 = require("./DbSqliteBase");
class DbSqliteArtist extends DbSqliteBase_1.DbSqliteBase {
    constructor() {
        super();
    }
    createArtist(artist) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!DbSqliteBase_1.DbSqliteBase.hasBeenInitialized) {
                yield this.init();
                DbSqliteBase_1.DbSqliteBase.hasBeenInitialized = true;
            }
            return new Promise((resolve, reject) => {
                this.db.run(`INSERT INTO artists (name, genre, country, year_of_foundation) 
        VALUES (?, ?, ?, ?)`, [
                    artist.name,
                    artist.genre,
                    artist.country,
                    artist.year_of_foundation
                ], (err) => {
                    if (err) {
                        console.error('Erro ao inserir artista', err.message);
                        return reject(err);
                    }
                    console.log('Artista inserido com sucesso! 🔥');
                    resolve();
                });
            });
        });
    }
    getArtist() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!DbSqliteBase_1.DbSqliteBase.hasBeenInitialized) {
                yield this.init();
                DbSqliteBase_1.DbSqliteBase.hasBeenInitialized = true;
            }
            return new Promise((resolve, reject) => {
                this.db.all(`SELECT * FROM artists`, (err, rows) => {
                    if (err)
                        return reject(err);
                    if (!rows || rows.length === 0) {
                        console.log('Nenhum artista encontrado.');
                        return resolve([]);
                    }
                    const artists = rows.map(row => new artist_1.Artist({
                        name: row.name,
                        genre: row.genre,
                        country: row.country
                    }, row.year_of_foundation, row.artist_id));
                    resolve(artists);
                });
            });
        });
    }
    updateArtist(artist) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!DbSqliteBase_1.DbSqliteBase.hasBeenInitialized) {
                yield this.init();
                DbSqliteBase_1.DbSqliteBase.hasBeenInitialized = true;
            }
            if (!artist.name) {
                throw new Error('Nome do artista é obrigatório para atualizar. ⚠️');
            }
            const { query, values } = this.generateUpdateQuery(artist);
            return new Promise((resolve, reject) => {
                this.db.run(query, values, (err) => {
                    if (err)
                        return reject(err);
                    console.log('Artista atualizado com sucesso!');
                    resolve();
                });
            });
        });
    }
    deleteArtist(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!DbSqliteBase_1.DbSqliteBase.hasBeenInitialized) {
                yield this.init();
                DbSqliteBase_1.DbSqliteBase.hasBeenInitialized = true;
            }
            return new Promise((resolve, reject) => {
                this.db.run(`DELETE FROM artists
         WHERE name = ?`, [name], (err) => {
                    if (err)
                        return reject(err);
                    console.log('Artista deletado com sucesso.');
                    resolve();
                });
            });
        });
    }
    getOneArtist(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!DbSqliteBase_1.DbSqliteBase.hasBeenInitialized) {
                yield this.init();
                DbSqliteBase_1.DbSqliteBase.hasBeenInitialized = true;
            }
            return new Promise((resolve, reject) => {
                this.db.get(`SELECT * FROM artists WHERE name = ?`, [name], (err, row) => {
                    if (err)
                        return reject(err);
                    if (!row)
                        return resolve(null);
                    const artist = new artist_1.Artist({
                        name: row.name,
                        genre: row.genre,
                        country: row.country
                    }, row.year_of_foundation, row.artist_id);
                    resolve(artist);
                });
            });
        });
    }
    generateUpdateQuery(artist) {
        const fields = [];
        const values = [];
        if (artist.country) {
            fields.push('country = ?');
            values.push(artist.country);
        }
        if (artist.genre) {
            fields.push('genre = ?');
            values.push(artist.genre);
        }
        if (artist.year_of_foundation) {
            fields.push('year_of_foundation = ?');
            values.push(artist.year_of_foundation);
        }
        if (fields.length === 0) {
            throw new Error('Nenhum campo para atualizar foi informado.');
        }
        const query = `
      UPDATE artists
      SET ${fields.join(', ')}
      WHERE name = ?
    `;
        values.push(artist.name);
        return { query, values };
    }
}
exports.DbSqliteArtist = DbSqliteArtist;
