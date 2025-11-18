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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbSqliteBase = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
class DbSqliteBase {
    constructor() {
        sqlite3_1.default.verbose();
        this.db = new sqlite3_1.default.Database('soundStageCli.db', (err) => {
            if (err) {
                console.error('Erro ao iniciar o banco:', err.message);
            }
            else {
                console.log('Banco criado/conectado com sucesso');
                // Ativa as foreign keys na conexão
                this.db.run('PRAGMA foreign_keys = ON;', (err) => {
                    if (err) {
                        console.error('Erro ao ativar foreign keys:', err.message);
                    }
                });
            }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db.run(`CREATE TABLE IF NOT EXISTS artists (
          artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR NOT NULL UNIQUE,  
          country VARCHAR NOT NULL,
          genre VARCHAR NOT NULL,
          year_of_foundation INTEGER
        );`, (err) => {
                    if (err)
                        return reject(err);
                    this.db.run(`CREATE TABLE IF NOT EXISTS albums (
              album_id INTEGER PRIMARY KEY AUTOINCREMENT,  
              name VARCHAR NOT NULL,
              genre VARCHAR NOT NULL,
              record_label VARCHAR,
              tracks INTEGER NOT NULL,  
              year INTEGER NOT NULL,
              artist_id INTEGER NOT NULL,
              FOREIGN KEY (artist_id) REFERENCES artists (artist_id) ON DELETE CASCADE
            );`, (err) => {
                        if (err)
                            return reject(err);
                        this.db.run(`CREATE INDEX IF NOT EXISTS idx_artists_name ON artists (name);`, (err) => {
                            if (err)
                                return reject(err);
                            this.db.run(`CREATE INDEX IF NOT EXISTS idx_albums_name ON albums (name);`, (err) => {
                                if (err)
                                    return reject(err);
                                resolve();
                            });
                        });
                    });
                });
            });
        });
    }
}
exports.DbSqliteBase = DbSqliteBase;
DbSqliteBase.hasBeenInitialized = false;
