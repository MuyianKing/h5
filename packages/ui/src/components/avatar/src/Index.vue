<script setup>
import multiavatar from '@multiavatar/multiavatar/esm'
import { Image as VanImage } from 'vant'
import { computed, ref } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 80,
  },
  src: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
})

const svgCode = multiavatar(props.name || '用户')

const error = ref(false)
function handleError() {
  error.value = true
}

const _style = computed(() => {
  return {
    width: `${props.size}px`,
    height: `${props.size}px`,
  }
})
</script>

<template>
  <van-image v-if="!error && src" v-bind="$attrs" :src="src" :width="size" :height="size" round @error="handleError" />
  <div v-else v-bind="$attrs" :style="_style" v-html="svgCode" />
</template>
