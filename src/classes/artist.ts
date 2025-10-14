import { InputMusicBase } from "../dto/inputMusicBase"
import { MusicBase } from "./musicBase"

export class Artist extends MusicBase {
  private _year_of_foundation: number

  constructor(
    inputBase: InputMusicBase,
    year_of_foundation: number
  ) {
    super(inputBase)
    
    this._year_of_foundation = year_of_foundation
  }

  public get year_of_foundation(): number {
    return this._year_of_foundation
  }
  public set year_of_foundation(value: number) {
    this._year_of_foundation = value
  }
}
