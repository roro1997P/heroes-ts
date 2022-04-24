import { MutationTree } from 'vuex'
import { HeroesStoreInterface } from './state'
import { HeroesAPIListInterface, HeroInterface } from '../../interfaces/heroes/Heroes'
import { HeroDetailInterface } from '../../interfaces/heroes/HeroDetail'
import { LocalStorage } from 'quasar'

const mutation: MutationTree<HeroesStoreInterface> = {
  setHeroList (state: HeroesStoreInterface, heroList: HeroesAPIListInterface) {
    state.heroesList = heroList
  },
  setHeroDetail (state: HeroesStoreInterface, heroDetail: HeroDetailInterface) {
    state.heroDetail = heroDetail
  },
  setHeroInFavorites (state: HeroesStoreInterface, hero: HeroInterface) {
    state.favoritesHeroes.push(hero)
    LocalStorage.set('favoriteHeroes', state.favoritesHeroes)
  },
  deleteHeroFromFavorites (state: HeroesStoreInterface, id: number) {
    const hero: any = state.favoritesHeroes?.find((h: HeroInterface) => h.id === id)
    const index: number = state.favoritesHeroes?.indexOf(hero)
    state.favoritesHeroes.splice(index, 1)
    LocalStorage.set('favoriteHeroes', state.favoritesHeroes)
  }
}

export default mutation
