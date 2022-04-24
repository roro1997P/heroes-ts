<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      bordered
      class="bg-secondary text-white"
    >
      <q-toolbar>
        <q-toolbar-title>
         {{ $t('SignIn') }} - {{ $t('HeroesApp') }}
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

      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view v-slot="{ Component }">
        <div class="bg-dark">
          <component :is="Component" />
        </div>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'

export default {
  name: 'LayoutLogin',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    const setLanguage = (value: string) : void => {
      locale.value = value
      localStorage.setItem('language', value)
    }

    return {
      locale,
      setLanguage
    }
  }
}
</script>
<style>
.q-menu {
  background-color: transparent !important;
}
</style>