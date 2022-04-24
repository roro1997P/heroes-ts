<template>
  <q-page padding>
    <q-card class="bg-secondary" bordered>
      <q-card-section>
        <div class="text-h6 text-white">{{ $t('HeroList') }}</div>
        <q-separator dark/>
      </q-card-section>
      <HeroList />
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeroList from '../components/HeroList.vue'

export default defineComponent({
  name: 'HeroesPage',
  components: { HeroList }
})
</script>
