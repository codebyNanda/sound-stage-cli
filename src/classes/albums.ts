export class Albums {
  nameOfAlbum: string
  genreOfAlbum: string
  recordLabel: string
  numberOfTracks: number
  year: number

  constructor(
    nameOfAlbum: string,
    genreOfAlbum: string,
    recordLabel: string,
    numberOfTracks: number,
    year: number,
  ) {
      this.nameOfAlbum = nameOfAlbum
      this.genreOfAlbum = genreOfAlbum
      this.recordLabel = recordLabel
      this.numberOfTracks = numberOfTracks
      this.year = year
    }
}