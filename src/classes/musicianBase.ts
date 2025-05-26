import { InputMusicBase, InputMusicianBase } from "../dto/inputMusicBase"
import { MusicBase } from "./musicBase"

export abstract class MusicianBase extends MusicBase {
  private _albumsInPartnership: string[]
  
  constructor(
    inputBase: InputMusicBase,
    inputMusicianBase: InputMusicianBase
    ) {
      super(inputBase)
      this._albumsInPartnership = inputMusicianBase.albumsInPartnership
  } 

  protected get albumsInPartnership(): string[] {
    return this._albumsInPartnership
  }
  protected set albumsInPartnership(value: string[]) {
    this._albumsInPartnership = value
  }
}