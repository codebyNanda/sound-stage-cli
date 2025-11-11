export class Album {
  name: string
  genre: string
  record_label: string
  tracks: number
  year: number
  artist_id?: number

  constructor(
    name: string,
    genre: string,
    record_label: string,
    tracks: number,
    year: number,
    artist_id?: number
  ) {
      this.name = name
      this.genre = genre
      this.record_label = record_label
      this.tracks = tracks
      this.year = year
      this.artist_id = artist_id
    }
}