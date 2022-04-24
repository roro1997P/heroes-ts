<template>
  <q-layout view="hHh LpR fFf" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-secondary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-btn flat :to="{ path: '/heroes' }">
            {{ $t('HeroesApp') }}
          </q-btn>
        </q-toolbar-title>

        <q-btn-dropdown auto-close rounded :label="locale" color="primary">
          <q-list dense class="text-white" style="background-color: rgba(0, 0, 0, 0.4)">
            <q-item clickable @click="setLanguage('es')">
              <q-item-section>
                <q-item-label>ES</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable @click="setLanguage('en')">
              <q-item-section>
                <q-item-label>EN</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn class="q-mx-md" dense flat round icon="logout" @click="setSignOut" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      show-if-above
      elevated
      class="bg-dark"
      style="color: whitesmoke"
    >
      <q-list>
        <ListMultiLevel
          v-for="(item, index) in menuItems" :key="index"
          :item="item"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <div class="bg-dark">
          <component :is="Component" />
        </div>
      </router-view>
    </q-page-container>

    <q-footer elevated class="bg-secondary text-white text-center">
      {{ $t('MarvelCredits') }}. © 2014 Marvel
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { useRouter } from 'vue-router'

import ListMultiLevel from '../components/ListMultiLevel.vue'

import { sideBarItems } from '../config'

export default defineComponent({
  name: 'AppLayout',
  components: { ListMultiLevel },
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    const store = useStore()
    const router = useRouter()

    const googleLogin = inject<any>('Vue3GoogleOauth')
    const leftDrawerOpen = ref(false)

    const dialog = ref({ signOut: false })

    const setSignOut = () : void | null => {
      try {
        googleLogin.instance.signOut()
        store.commit('auth/setLogState', false)
        router.push('/')
      } catch (error) {
        store.commit('auth/setLogState', false)
        return null
      }
    }
    const setLanguage = (value: string) : void => {
      locale.value = value
      localStorage.setItem('language', value)
    }

    return {
      dialog,
      menuItems: sideBarItems,
      leftDrawerOpen,
      locale,
      setSignOut,
      setLanguage,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
<style>
.q-menu {
  background-color: transparent !important;
}
</style>