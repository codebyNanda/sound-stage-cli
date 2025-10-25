import { Artist } from "../classes/artist"

export interface IArtistDatabase {
  createArtist(artist: Artist): Promise<void>
  getArtist(): Promise<Artist[]>
  getOneArtist(name: string): Promise<Artist | null>
  updateArtist(artist: Partial<Artist>): Promise<void>
  deleteArtist(name: string): Promise<void>
}