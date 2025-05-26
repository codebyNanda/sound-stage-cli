import { InputMusicBase, InputMusicianBase } from "../dto/inputMusicBase"
import { MusicianBase } from "./musicianBase"

export class Drummer extends MusicianBase {
  private _bandsHasPlayedIn: string[]
 
  constructor(
    inputBase: InputMusicBase,
    inputMusicianBase: InputMusicianBase,
    bandsHasPlayedIn: string[]
  ) {
    super(inputBase, inputMusicianBase)

    this._bandsHasPlayedIn = bandsHasPlayedIn
  }

  public get bandsHasPlayedIn(): string[] {
    return this._bandsHasPlayedIn
  }
  public set bandsHasPlayedIn(value: string[]) {
    this._bandsHasPlayedIn = value
  }

  compositions(): void {
    console.log('Composições :: ')
  }
}