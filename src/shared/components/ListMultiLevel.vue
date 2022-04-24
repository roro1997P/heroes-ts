<template>
  <q-expansion-item
    v-if="item.subItems"
    class="text-weight-medium"
    :label="item.label"
    :icon="item.icon ?? null"
    :caption="item.caption"
    :default-opened="item.opened ?? false"
    :header-inset-level="item.headerLevel"
    :content-inset-level="item.contentLevel"
  >
    <ListMultiLevel
      v-for="(itemChild, index) in item.subItems"
      :key="index"
      :item="itemChild"
    />
  </q-expansion-item>
  <template v-else>
    <q-item
      :class="item.customClass ? item.customClass : 'bg-gray text-primary'"
      class="q-my-sm"
      clickable
      dense
      tag="a"
      :to="item.path"
    >
      <q-item-section v-if="item.icon" avatar style="margin-left: 28px">
        <q-icon :name="item.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ $t(`${item.label}`) }}</q-item-label>
        <q-item-label v-if="item.caption" caption>
          {{ $t(`${item.caption}`) }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator v-if="item.separator" dark/>
  </template>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ListMultiLevel',
  props: {
    item: Object
  }
})
</script>
<style scoped>
.q-item__section--side .q-item__section--avatar {
  max-width: 40px !important;
}
</style>
