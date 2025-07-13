"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const artist_1 = require("./classes/artist");
const drummer_1 = require("./classes/drummer");
const guitarist_1 = require("./classes/guitarist");
const singer_1 = require("./classes/singer");
const beArtist = new artist_1.Artist({
    name: 'Teste',
    genre: 'Rock',
    country: 'BR',
}, 'teste', 1998);
const beSinger = new singer_1.Singer({
    name: 'Rob Halford',
    country: 'UK',
    genre: 'Heavy Metal',
}, {
    albumsInPartnership: ['The Wrong Side of Heaven and the Righteous Side of Hell, Volume 1'],
}, ['Halford']);
const beDrummer = new drummer_1.Drummer({
    name: 'Nicko McBrain',
    country: 'UK',
    genre: 'Heavy Metal',
}, {
    albumsInPartnership: [''],
}, ['Streetwalkers']);
const beGuitarist = new guitarist_1.Guitarist({
    name: 'Dave Mustaine',
    country: 'United States',
    genre: 'Thrash Metal',
}, {
    albumsInPartnership: [''],
}, ['Metallica']);
// Salvando os dados em um arquivo JSON formatado
const artists = [JSON.stringify(beArtist), beSinger, beDrummer, beGuitarist];
const jsonData = JSON.stringify(artists, null, 2);
const jsonArtist = JSON.stringify(beArtist, null, 2);
const jsonSinger = JSON.stringify(beSinger, null, 2);
// console.log(jsonArtist)
// Escrevendo no arquivo JSON
fs.writeFile('jsonData.json', jsonArtist, 'utf-8', (err) => {
    if (err) {
        console.error("Erro ao salvar o arquivo:", err);
    }
    else {
        console.log("Dados salvos com sucesso!");
    }
});
// Lendo o arquivo JSON
fs.readFile('jsonData.json', 'utf-8', (err, data) => {
    if (err) {
        console.error("Erro ao ler o arquivo:", err);
        return;
    }
    // Convertendo JSON para objeto Javascript
    const jsonRaw = JSON.parse(data);
    console.log(jsonRaw[0]);
    const artist = JSON.parse(data);
    artist.recordLabels;
    console.log(artist);
});
