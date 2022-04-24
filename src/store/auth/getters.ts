import { GetterTree } from 'vuex'
import { LocalStorage } from 'quasar'
import { StateInterface } from '../index'
import { AuthStoreInterface } from './state'

const getters: GetterTree<AuthStoreInterface, StateInterface> = {
  getLogState () : boolean {
    const isLogged = LocalStorage.getItem('isLogged')
    const expirates = LocalStorage.getItem('tokenExpiration') || 0
    return !isLogged ? false : expirates > Date.now()
  }
}

export default getters
