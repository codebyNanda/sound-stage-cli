import { InputMusicBase } from "../dto/inputMusicBase"

export abstract class MusicBase {
  private _name: string
  private _genre: string
  private _country: string
  
  constructor(inputBase: InputMusicBase) {
    this._name = inputBase.name
    this._genre = inputBase.genre
    this._country = inputBase.country
  } 

  public get name(): string {
    return this._name
  }
  public set name(value: string) {
    this._name = value
  }

  public get genre(): string {
    return this._genre
  }
  public set genre(value: string) {
    this._genre = value
  }

  public get country(): string {
    return this._country
  }
  public set country(value: string) {
    this._country = value
  }

}