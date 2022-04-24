<template>
  <q-card-section>
    <q-table
      grid
      :rows="rows"
      row-key="id"
      hide-header
      :rows-per-page-options="[5, 10, 15, 20]"
      :pagination="pagination"
      card-container-style="justify-content: center"
    >
    <template v-slot:item="props">
      <q-img 
        :src="`${props.row.thumbnail.path}.${props.row.thumbnail.extension}`" 
        :alt="props.row.name"
        style="height: 170px; max-width: 250px"
        class="rounded-borders q-ma-md"
        fit="fill"
      >
        <div class="absolute-full text-subtitle2 flex flex-center" style="flex-direction: column">
          {{ props.row.name }}
          <div>
            <q-btn :label="$t('ViewDetails')" :to="{ name: 'HeroDetailPage', params: { heroId: props.row.id, isEditing: true } }"/>
          </div>
        </div>
      </q-img>
    </template>
    </q-table>
  </q-card-section>
</template>

<script lang="ts">
import { LocalStorage } from 'quasar'
import { defineComponent, ref } from 'vue'

import { HeroInterface } from '../../../interfaces/heroes/Heroes'

interface PaginationInterface {
  page: number
  rowsPerPage: number
}

export default defineComponent({
  name: 'HeroesFavoriteList',
  setup () {
    const loading = ref<boolean>(false)

    const rows = ref<string | Array<HeroInterface>>(LocalStorage.getItem('favoriteHeroes') || [])

    const pagination = ref<PaginationInterface>({
      page: 1,
      rowsPerPage: 5
    })

    return {
      loading,
      pagination,
      rows
    }
  }
})
</script>