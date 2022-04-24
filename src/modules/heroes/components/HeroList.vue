<template>
  <q-card-section>
    <q-table
      grid
      :rows="rows"
      :columns="columns"
      row-key="id"
      hide-header
      :rows-per-page-options="[5, 10, 15, 20]"
      :loading="loading"
      v-model:pagination="pagination"
      @request="onRequest"
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
            <q-btn :label="$t('ViewDetails')" :to="{ name: 'HeroDetailPage', params: { heroId: props.row.id } }"/>
          </div>
        </div>
      </q-img>
    </template>
    </q-table>
  </q-card-section>
</template>

<script lang="ts">
import { useStore } from 'src/store'
import { defineComponent, onBeforeMount, ref } from 'vue'

interface PaginationInterface {
  descending: boolean
  page: number
  rowsNumber: number
  rowsPerPage: number
  sortBy: string
}

export default defineComponent({
  name: 'HeroList',
  setup () {
    const store = useStore()
    const loading = ref<boolean>(false)

    const pagination = ref<PaginationInterface>({
      sortBy: '',
      descending: false,
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 5
    })

    const columns = [
      { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true }
    ]

    const rows = ref([])
    
    const getDataFromApi = async () : Promise<void> => {
      loading.value = true
      const data = await store.dispatch('heroes/doGetHeroList', pagination.value)
      if (data) {
        pagination.value.rowsNumber = data.total
        rows.value = data.results
      }
      loading.value = false
    }

    const onRequest = async ({ pagination: updatedPagination }: { pagination: PaginationInterface }) => {
      pagination.value = updatedPagination
      await getDataFromApi()
    }

    onBeforeMount(async () => {
      await getDataFromApi()
    })

    return {
      loading,
      pagination,
      columns,
      rows,
      getDataFromApi,
      onRequest
    }
  }
})
</script>