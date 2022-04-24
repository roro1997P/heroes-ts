import { route } from 'quasar/wrappers'
import { Notify } from 'quasar'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import { StateInterface } from '../store'
import routes from './routes'

export default route<StateInterface>(function ({ store }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    )
  })

  Router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (store.getters['auth/getLogState']) {
        next()
      } else {
        Notify.create({
          type: 'warning',
          message: 'Login required'
        })
        next({ path: '/' })
      }
    } else {
      if (store.getters['auth/getLogState'] && to.path === '/') {
        next({ path: '/heroes' })
      } else {
        next()
      }
    }
  })

  return Router
})
