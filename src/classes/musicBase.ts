import { InputMusicBase } from "../dto/inputMusicBase"

export abstract class MusicBase {
  private _name: string
  private _genre: string
  private _country: string
  
  constructor(inputBase: InputMusicBase) {
    this._name = inputBase.name
    this._genre = inputBase.genre as string
    this._country = inputBase.country
  } 

  protected get name(): string {
    return this._name
  }
  protected set name(value: string) {
    this._name = value
  }

  protected get genre(): string {
    return this._genre
  }
  protected set genre(value: string) {
    this._genre = value
  }

  protected get country(): string {
    return this._country
  }
  protected set country(value: string) {
    this._country = value
  }

}