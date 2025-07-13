import { Artist } from "../classes/artist"

export interface IDatabaseConnector {
  init(): Promise<void>
  createArtist(artist: Artist): Promise<Artist>
}