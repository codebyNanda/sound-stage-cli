import { Album } from "../classes/albums"

export interface IAlbumDatabase {
  init(): void
  createAlbum(album: Album): Promise<void>
  getAlbums(): Promise<Album[]>
  getOneAlbum(name: string): Promise<Album | null>
  updateAlbum(album: Partial<Album>): Promise<void>
  deleteAlbum(name: string): Promise<void>
}