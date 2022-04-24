import { MutationTree } from 'vuex'
import { LocalStorage } from 'quasar'
import { AuthStoreInterface } from './state'

const mutation: MutationTree<AuthStoreInterface> = {
  setLogState (state: AuthStoreInterface, logNewState: boolean) {
    if (!logNewState) {
      LocalStorage.remove('tokenExpiration')
    }
    state.isLoggedIn = logNewState
    LocalStorage.set('isLogged', logNewState)
  },
  setTokenExpiration (state: AuthStoreInterface, expiration: number) {
    state.tokenExpiration = expiration
    LocalStorage.set('tokenExpiration', expiration)
  }
}

export default mutation
