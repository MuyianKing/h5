<script setup>
import { Tabbar, TabbarItem } from 'vant'
import { onMounted, ref } from 'vue'
import IconComp from './components/Icon.vue'

defineProps({
  list: {
    type: Array,
    default() {
      return []
    },
  },
})

const active = ref('/')
onMounted(() => {
  active.value = window.location.hash.replace('#', '').split('?')[0]
})
</script>

<template>
  <tabbar v-model="active" class="hl-tabbar">
    <tabbar-item v-for="tabbar in list" :key="tabbar.path || tabbar.name" :name="tabbar.path" replace :to="tabbar.path" :badge="tabbar.badge">
      <span>{{ tabbar.name }}</span>
      <template #icon="props">
        <icon-comp :src="props.active ? tabbar.active || tabbar.inactive : tabbar.inactive" :class="{ active: props.active }" />
      </template>
    </tabbar-item>
  </tabbar>
</template>
