import { Artist } from "../classes/artist"
import { confirm } from '@inquirer/prompts'

export async function getArtist(artists: Artist[]): Promise<Artist[]> {
  
  await confirm({ message: 'Deseja listar todos os artistas cadastrados na Sound Stage Library? ' })

  return artists

}