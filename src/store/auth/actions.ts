import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { AuthStoreInterface } from './state'

const actions: ActionTree<AuthStoreInterface, StateInterface> = {
  doLogin ({ commit }, googleState: any) {
    if (typeof (googleState) === 'boolean') {
      commit('setLogState', googleState)
    } else {
      commit('setLogState', googleState.instance.isSignedIn?.tb)
      commit('setTokenExpiration', googleState.instance.currentUser.tb.xc.expires_at)
    }
  }
}

export default actions
