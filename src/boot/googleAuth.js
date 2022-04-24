import { boot } from 'quasar/wrappers'
import GAuth from 'vue3-google-oauth2'

export default boot(({ app }) => {
  const gAuthOptions = {
    clientId: '398191856920-67b7d9p38v6191d8at2l51od52bmmq4h.apps.googleusercontent.com',
    scope: 'email',
    prompt: 'consent',
    fetch_basic_profile: false
  }

  app.use(GAuth, gAuthOptions)
})
