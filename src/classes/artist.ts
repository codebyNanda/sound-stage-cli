import { InputMusicBase } from "../dto/inputMusicBase"
import { MusicBase } from "./musicBase"

export class Artist extends MusicBase {
  private _record_labels: string
  private _year_of_foundation: number

  constructor(
    inputBase: InputMusicBase,
    record_labels: string,
    year_of_foundation: number
  ) {
    super(inputBase)
    
    this._record_labels = record_labels
    this._year_of_foundation = year_of_foundation
  }

  // public get name(): string {
  //   return this.name
  // }
  // public set name(value: string) {
  //   this.name = value
  // }

  // public get genre(): string {
  //     return this.genre
  // }
  // public set genre(value: string) {
  //     this.genre = value
  // }

  // public get country(): string {
  //     return this.country
  // }
  // public set country(value: string) {
  //     this.country = value
  // }

  public get record_labels(): string {
    return this._record_labels
  }
  public set record_labels(value: string) {
    this._record_labels = value
  }

  public get year_of_foundation(): number {
    return this._year_of_foundation
  }
  public set year_of_foundation(value: number) {
    this._year_of_foundation = value
  }

  addRecordLabel() {
    console.log('Adicionando gravadora :: ')
  }
}
