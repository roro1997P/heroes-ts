import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance } from 'axios'
import { Notify } from 'quasar'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://gateway.marvel.com/v1/public/' }) 

export default boot(({ app, store, router }) => {

  // Request interceptor
  api.interceptors.request.use(function (config) {
    const isSignedIn = store.getters['auth/getLogState']
    if (isSignedIn) {
      return config
    } else {
      Notify.create({
        type: 'warning',
        message: 'session expirated'
      })
      router.push('/')
    }
  }, function (error) {
    Notify.create({
      type: 'negative',
      message: error
    })
    return Promise.reject(error)
  })

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
