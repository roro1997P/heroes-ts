<template>
  <div>
    <div v-if="heroDetail" class="card-box">
      <div class="card">    
        <div class="front">
          <q-img fit="contain" :src="`${heroDetail.thumbnail.path}.${heroDetail.thumbnail.extension}`" class="image-sizes"/>
        </div>
        <div class="front back">
          <q-card class="bg-dark text-center text-white flex" style="height: 400px; flex-direction: column; justify-content: center">
            <q-card-section>
              {{ heroDetail.name }}
            </q-card-section>
            <q-card-section>
              {{ heroDetail.description ? heroDetail.description : 'No description' }}
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="flex justify-center q-my-md">
      <q-btn
        v-if="!isEditing"
        @click="addHeroToFavorites({
          id: heroDetail.id,
          name: heroDetail.name,
          description: heroDetail.description,
          thumbnail: heroDetail.thumbnail
        })"
        :label="$t('AddToFavorites')"
        color="dark" class="q-ma-sm"
      />
      <q-btn
        v-else
        @click="deleteHeroFromFavorites(heroDetail.id)"
        :label="$t('DeleteFromFavorites')"
        color="negative" class="q-ma-sm"
      />
      <q-btn @click="goBack" :label="$t('GoBack')" color="dark" class="q-ma-sm"/>
    </div>
    <q-inner-loading
      :showing="loading"
      :label="$t('PleaseWait') + '...'"
      label-class="text-white"
      label-style="font-size: 1.1em"
      dark
      style="position: absolute; z-index: 10"
    />
  </div>
</template>

<script lang="ts">
import { LocalStorage, useQuasar } from 'quasar'
import { useStore } from 'src/store'
import { defineComponent, onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import { Result } from '../../../interfaces/heroes/HeroDetail'
import { HeroInterface } from '../../../interfaces/heroes/Heroes'

export default defineComponent({
  name: 'HeroDetail',
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const { t: $t } = useI18n()

    const $q = useQuasar()
    const loading = ref<boolean>(false)
    const isEditing = ref<boolean>(false)

    const heroDetail = ref<Result>()

    const getHeroDetails = async () : Promise<void> => {
      loading.value = true
      const data = await store.dispatch('heroes/doGetHeroDetails', route.params.heroId)
      heroDetail.value = data.results[0]
      const exists = heroDetail.value ? existsHeroInFavorite(heroDetail.value?.id) : false
      if (exists) isEditing.value = true
      loading.value = false
    }

    const addHeroToFavorites = (hero: HeroInterface) : void => {
      const exists = existsHeroInFavorite(hero.id)
      if (!exists) { 
        store.dispatch('heroes/addHeroToFavorites', hero)
        triggerNotification('positive', $t('SuccessfullyAdded'))
        isEditing.value = true
      } else {
        triggerNotification('negative', $t('HeroAlreadyInFavorites'))
      }
    }

    const deleteHeroFromFavorites = (id: number) : void => {
      store.dispatch('heroes/deleteHeroFromFavorites', id)
      triggerNotification('positive', $t('SuccessfullyDeleted'))
      isEditing.value = false
    }

    const existsHeroInFavorite = (id: number) : boolean => {
      const heroList: any = LocalStorage.getItem('favoriteHeroes')
      const exists = heroList?.find((h: HeroInterface) => h.id === id)
      return exists ?? false
    }

    const triggerNotification = (type: string, message: string) : void => {
      $q.notify({ type, message })
    }

    const goBack = () : void => {
      router.back()
    }

    onBeforeMount(async () => {
      if (route.params.isEditing) {
        isEditing.value = true
      }
      await getHeroDetails()
    })

    return {
      loading,
      isEditing,
      heroDetail,
      goBack,
      addHeroToFavorites,
      deleteHeroFromFavorites
    }

  }
})
</script>
<style scoped>
.card-box {
  width: 400px;
  height: 400px;
  position: relative;
  perspective: 1000px;
  margin: 0px auto;
}

.card-box:hover .card {
    transform: rotateY(180deg);
}

.card {
  transform-style: preserve-3d;
  transition: all 0.5s linear;
}

.front {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
}

.front.back {
  transform: rotateY(180deg);
}

.image-sizes {
  width: 400px;
  height: 400px;
}

@media screen and (max-width: 480px) {
  .card-box {
    width: 250px;
    height: 250px;
  }
  .image-sizes {
    width: 250px;
    height: 250px;
  }
}
</style>