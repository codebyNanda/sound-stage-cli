import { Artist } from "../classes/artist"

export interface IDatabaseConnector {
  init(): void
  createArtist(artist: Artist): Promise<void>
  getArtist(): Promise<Artist[]>
  updateArtist(artist: Partial<Artist>): Promise<void>
  deleteArtist(artist: Partial<Artist>): Promise<void>
}