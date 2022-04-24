<template>
  <q-page padding>
    <q-card class="bg-secondary" bordered>
      <q-card-section>
        <div class="text-h6 text-white">{{ $t('FavoriteList') }}</div>
        <q-separator dark/>
      </q-card-section>
      <HeroesFavoriteList />
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeroesFavoriteList from '../components/HeroesFavoriteList.vue'

export default defineComponent({
  name: 'HeroesFavoritePage',
  components: { HeroesFavoriteList }
})
</script>
