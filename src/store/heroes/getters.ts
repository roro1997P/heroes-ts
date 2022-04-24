import { GetterTree } from 'vuex'
// import { LocalStorage } from 'quasar'
import { StateInterface } from '../index'
import { HeroesStoreInterface } from './state'

const getters: GetterTree<HeroesStoreInterface, StateInterface> = {
  // getLogState () : boolean {
  //   const isLogged = LocalStorage.getItem('isLogged')
  //   const expirates = LocalStorage.getItem('tokenExpiration') || 0
  //   return !isLogged ? false : expirates > Date.now()
  // }
}

export default getters
