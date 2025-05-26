import { InputMusicBase, InputMusicianBase } from "../dto/inputMusicBase"
import { MusicianBase } from "./musicianBase"

export class Singer extends MusicianBase {
  private _bandsHasSungIn: string[]
 
  constructor(
    inputBase: InputMusicBase,
    inputMusicianBase: InputMusicianBase,
    bandsHasSungIn: string[],
  ) {
    super(inputBase, inputMusicianBase)

    this._bandsHasSungIn = bandsHasSungIn
  }

  public get bandsHasSungIn(): string[] {
    return this._bandsHasSungIn
  }
  public set bandsHasSungIn(value: string[]) {
    this._bandsHasSungIn = value
  }

  compositions(): void {
    console.log('Composições :: ')
  }
}