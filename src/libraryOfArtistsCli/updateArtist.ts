import { input, select } from '@inquirer/prompts'
import { Artist } from "../classes/artist"
import { createArtist } from './createArtist'

export async function updateArtist(artists: Artist[]) {

  const inputName = await input({ message: 'Digite o nome do artista que deseja atualizar: '})

  const answer = await select({
  message: 'Selecione a informação que deseja atualizar: ',
  choices: [
    {
      name: 'Nome',
      value: '',
      description: 'Nome do artista'
    },
    // {
    //   name: 'Estilo',
    //   value: artist.values.genre,
    //   description: 'yarn is an awesome package manager',
    // },
  ]})

}