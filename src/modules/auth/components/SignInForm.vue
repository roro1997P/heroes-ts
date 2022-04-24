<template>
  <q-btn
    :loading="!googleLogin.isInit || loading"
    color="secondary"
    icon="ion-logo-google" text-color="primary" :label="$t('LoginWithGoogle')"
    @click="doGoogleLogin"
  />
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'src/store'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'SignInForm',
  setup () {
    const store = useStore()
    const router = useRouter()
    const $q = useQuasar()
    const { t: $t } = useI18n()

    const googleLogin = inject<any>('Vue3GoogleOauth')
    const loading = ref<boolean>(false)
    
    const doGoogleLogin = async () : Promise<void | null> => {
      try {
        loading.value = true
        await googleLogin.instance.signIn()
        if (googleLogin.instance.isSignedIn?.tb) {
          store.dispatch('auth/doLogin', googleLogin)
          triggerNotification('positive', $t('SuccessfullyLoggedIn'))
          router.push('/heroes')
        }
      } catch (error) {
        triggerNotification('negative', $t('LoginError'))
      }
      loading.value = false
    }

    const triggerNotification = (type: string, message: string) : void => {
      $q.notify({ type, message })
    }

    return {
      googleLogin,
      loading,
      doGoogleLogin
    }
  }
})
</script>