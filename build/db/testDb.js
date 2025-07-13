"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
database_1.db.all('SELECT name FROM sqlite_master WHERE type="table"', (err, rows) => {
    if (err) {
        console.error('Erro ao consultar tabelas:', err.message);
    }
    else {
        console.log('Tabelas existentes no banco:');
        rows.forEach((row) => {
            console.log(row.name);
        });
    }
});
