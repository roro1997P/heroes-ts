import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { AuthStoreInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const exampleModule: Module<AuthStoreInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default exampleModule
