import { Albums } from "../classes/albums"

export interface IAlbumDatabase {
  createAlbum(album: Albums): Promise<void>
  getAlbums(): Promise<Albums[]>
  getOneAlbum(name: string): Promise<Albums | null>
  updateAlbum(album: Partial<Albums>): Promise<void>
  deleteAlbum(name: string): Promise<void>
}