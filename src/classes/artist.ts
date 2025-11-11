import { InputMusicBase } from "../dto/inputMusicBase"
import { MusicBase } from "./musicBase"

export class Artist extends MusicBase {
  private _year_of_foundation: number
  artist_id?: number

  constructor(
    inputBase: InputMusicBase,
    year_of_foundation: number,
    artist_id?: number
  ) {
    super(inputBase)
    
    this._year_of_foundation = year_of_foundation
    this.artist_id = artist_id
  }

  public get year_of_foundation(): number {
    return this._year_of_foundation
  }
  public set year_of_foundation(value: number) {
    this._year_of_foundation = value
  }
}
