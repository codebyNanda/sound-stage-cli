import { Artist } from "../classes/artist"

export interface IDatabaseConnector {
  init(): void
  createArtist(artist: Artist): Promise<void>
  getArtist(): Promise<Artist[]>
  getOneArtist(name: string): Promise<Artist | null>
  updateArtist(artist: Partial<Artist>): Promise<void>
  deleteArtist(name: string): Promise<void>
}