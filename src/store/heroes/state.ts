import { HeroesAPIListInterface, HeroInterface } from '../../interfaces/heroes/Heroes'
import { HeroDetailInterface } from '../../interfaces/heroes/HeroDetail'
import { LocalStorage } from 'quasar'

export interface HeroesStoreInterface {
  heroesList: HeroesAPIListInterface | null
  heroDetail: HeroDetailInterface | null
  favoritesHeroes: Array<HeroInterface>
}

function state (): HeroesStoreInterface {
  return {
    heroesList: null,
    heroDetail: null,
    favoritesHeroes: LocalStorage.getItem('favoriteHeroes') || []
  }
}

export default state
