import { InputMusicBase } from "../dto/inputMusicBase"
import { MusicBase } from "./musicBase"

export class Artist extends MusicBase {
  private _recordLabels: string
  private _yearOfFundation?: number | undefined

  constructor(
    inputBase: InputMusicBase,
    recordLabels: string,
    yearOfFundation?: number
  ) {
    super(inputBase)
    
    this._recordLabels = recordLabels
    this._yearOfFundation = yearOfFundation
  }

  public get recordLabels(): string {
    return this._recordLabels
  }
  public set recordLabels(value: string) {
    this._recordLabels = value
  }

  public get yearOfFundation(): number | undefined {
    return this._yearOfFundation
  }
  public set yearOfFundation(value: number | undefined) {
    this._yearOfFundation = value
  }

  addRecordLabel() {
    console.log('Adicionando gravadora :: ')
  }
}
