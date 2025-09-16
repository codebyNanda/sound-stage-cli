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