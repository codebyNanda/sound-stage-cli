import { InputMusicBase } from "../dto/inputMusicBase"
import { MusicBase } from "./musicBase"

export class Albums extends MusicBase {
  nameofAlbum: string
  year: number
  numberOfTracks: number
  recordLabel: string

  constructor(
    inputBase: InputMusicBase,
    nameofAlbum: string,
    year: number,
    numberOfTracks: number,
    recordLabel: string
  ) {
      super(inputBase)
      this.nameofAlbum = nameofAlbum
      this.year = year
      this.numberOfTracks = numberOfTracks
      this.recordLabel = recordLabel
    }

  play(): void {
    console.log('We are Defenders of the Faith!')
  }

  composedBy(): void {
    console.log('Composição por :: ')
  }

  lyrics() {
    console.log('Letras de todas as faixas do álbum :: ')
  }
}