import { ActionTree } from 'vuex'
import { api } from '../../boot/axios'
import { HeroesAPIListInterface, HeroInterface } from '../../interfaces/heroes/Heroes'
import { HeroDetailInterface } from '../../interfaces/heroes/HeroDetail'
import { StateInterface } from '../index'
import { HeroesStoreInterface } from './state'

const generalParams = '?ts=1000&apikey=6b3354ea9743194b5c5a52dfe6041199&hash=dda869c964ba2cca412a99c4ce592bb6'
interface PaginationInterface {
  descending: boolean
  page: number
  rowsNumber: number
  rowsPerPage: number
  sortBy: string
}

const actions: ActionTree<HeroesStoreInterface, StateInterface> = {
  async doGetHeroList ({ commit }, payload: PaginationInterface) {
    const params = {
      offset: payload.rowsPerPage * (payload.page - 1),
      limit: payload.rowsPerPage,
      orderBy: payload.sortBy
    }
    try {
      const response = await api.get(`characters${generalParams}`, { params: { ...params } })
      const data: HeroDetailInterface = response.data.data
      commit('setHeroList', data)
      return data
    } catch (error) {
      return null
    }
  },
  async doGetHeroDetails ({ commit }, payload: string | number) {
    try {
      const response = await api.get(`characters/${payload}${generalParams}`)
      const data: HeroesAPIListInterface = response.data.data
      commit('setHeroDetail', data)
      return data
    } catch (error) {
      return null
    }
  },
  addHeroToFavorites ({ commit }, payload: HeroInterface) {
    commit('setHeroInFavorites', payload)
  },
  deleteHeroFromFavorites ({ commit }, payload: number) {
    commit('deleteHeroFromFavorites', payload)
  }
}

export default actions
