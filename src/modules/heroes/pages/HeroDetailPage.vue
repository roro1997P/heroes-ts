<template>
  <q-page padding>
    <q-card class="bg-secondary" bordered>
      <q-card-section>
        <div class="text-h6 text-white">{{ $t('HeroDetails') }}</div>
        <q-separator dark/>
      </q-card-section>
      <HeroDetail />
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeroDetail from '../components/HeroDetail.vue'

export default defineComponent({
  name: 'HeroDetailPage',
  components: { HeroDetail }
})
</script>
