import { db } from './database'

db.all('SELECT name FROM sqlite_master WHERE type="table"', (err, rows) => {
  if (err) {
    console.error('Erro ao consultar tabelas:', err.message)
  } else {
    console.log('Tabelas existentes no banco:')
    rows.forEach((row: any) => {
      console.log(row.name)
    })
  }
})
