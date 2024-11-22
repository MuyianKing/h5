<script setup>
import HlTop from '../../top'

defineProps({
  title: {
    type: String,
    default: '',
  },
  noBack: {
    type: Boolean,
    default: false,
  },
  noTop: {
    type: Boolean,
    default: false,
  },
  bodyWrapperClass: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="hl-main-body">
    <hl-top v-if="!noTop" :title="title" :no-back="noBack" />
    <div class="main-body-wrapper" :class="bodyWrapperClass" safe-area-inset-bottom>
      <slot />
    </div>
  </div>
</template>
