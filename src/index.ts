import * as fs from 'fs'
import { Artist } from "./classes/artist"
import { Drummer } from "./classes/drummer"
import { Guitarist } from "./classes/guitarist"
import { Singer } from "./classes/singer"

const beArtist = new Artist(
  {
   name: 'Teste', 
   genre: 'Rock', 
   country: 'BR', 
  },
  'teste',
  1998
)

const beSinger = new Singer(
  {
    name: 'Rob Halford',
    country: 'UK',
    genre: 'Heavy Metal',
  },
  {
    albumsInPartnership: ['The Wrong Side of Heaven and the Righteous Side of Hell, Volume 1'],
  },
  ['Halford']
)

const beDrummer = new Drummer(
  {
    name: 'Nicko McBrain',
    country: 'UK',
    genre: 'Heavy Metal',
  },
  {
    albumsInPartnership: [''],
  },
  ['Streetwalkers']
)

const beGuitarist = new Guitarist(
  {
    name: 'Dave Mustaine',
    country: 'United States',
    genre: 'Thrash Metal',
  },
  {
    albumsInPartnership: [''],
  },
  ['Metallica']
)


// Salvando os dados em um arquivo JSON formatado
const artists = [JSON.stringify(beArtist), beSinger, beDrummer, beGuitarist]
const jsonData = JSON.stringify(artists, null, 2)
const jsonArtist = JSON.stringify(beArtist, null, 2)
const jsonSinger = JSON.stringify(beSinger, null, 2)
// console.log(jsonArtist)


// Escrevendo no arquivo JSON
fs.writeFile('jsonData.json', jsonArtist, 'utf-8', (err: any) => {
  if (err) {
    console.error("Erro ao salvar o arquivo:", err)
  } else {
    console.log("Dados salvos com sucesso!")
  }
})


// Lendo o arquivo JSON
fs.readFile('jsonData.json', 'utf-8', (err: any, data: any) => {
  if (err) {
    console.error("Erro ao ler o arquivo:", err)
    return
  }

// Convertendo JSON para objeto Javascript
  const jsonRaw = JSON.parse(data)
  console.log(jsonRaw[0])

  const artist = JSON.parse(data) as Artist
  artist.recordLabels
  console.log(artist)
})