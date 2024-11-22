<script setup>
import { NavBar } from 'vant'
import { computed, inject } from 'vue'

const props = defineProps({
  // 标题
  title: {
    type: String,
    default: '',
  },
  noBack: {
    type: Boolean,
    default: false,
  },
  bgc: {
    type: String,
    default: '',
  },
})

const { backFun } = inject('GLOBAL_CUSTOM_CONFIG', null)

function handleBack() {
  if (props.noBack) {
    return
  }

  if (backFun && typeof backFun === 'function') {
    backFun()
    return
  }

  window.history.go(-1)
}

const _style = computed(() => {
  const s = {}
  if (props.bgc) {
    s['--van-primary-color'] = props.bgc
  }

  return s
})
</script>

<template>
  <div class="hl-van-nav-bar" :style="_style">
    <div class="hl-top-empty" safe-area-inset-top />
    <nav-bar v-if="!$slots.default" :left-text="title" :left-arrow="!noBack" class="line-clamp-1" @click-left="handleBack" />
    <div @click="handleBack">
      <slot />
    </div>
  </div>
</template>
