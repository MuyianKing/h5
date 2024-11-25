<script setup>
import { Button as VanButton } from 'vant'

defineProps({
  type: {
    type: String,
    default: 'primary',
  },
  loadingText: {
    type: String,
    default: '提交中...',
  },
})
</script>

<template>
  <van-button class="hl-button" :type :loading-text>
    <slot />
  </van-button>
</template>
