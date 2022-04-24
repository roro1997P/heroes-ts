import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore
} from 'vuex'
import auth from './auth'
import heroes from './heroes'
import { AuthStoreInterface } from './auth/state'
import { HeroesStoreInterface } from './heroes/state'

export interface StateInterface {
  auth: AuthStoreInterface
  home: HeroesStoreInterface
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

export default store(function () {
  const Store = createStore<StateInterface>({
    modules: {
      auth,
      heroes
    },

    strict: !!process.env.DEBUGGING
  })

  return Store
})

export function useStore () {
  return vuexUseStore(storeKey)
}
