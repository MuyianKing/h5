<script setup>
import { computed } from 'vue'

const props = defineProps({
  contentPosition: {
    type: String,
    default: 'center',
  },
  type: {
    type: String,
    default: 'solid',
  },
  color: {
    type: String,
    default: '#dcdfe6',
  },
})

const _style = computed(() => ({
  'justify-content': props.contentPosition,
}))

const _line_style = computed(() => ({
  'border-top-style': props.type,
  'border-top-color': props.color,
}))
</script>

<template>
  <div class="hl-divider" :style="_style">
    <div class="divider-line" :class="{ 'divider-line-duan': contentPosition === 'left' }" :style="_line_style" />
    <div v-if="$slots.default" class="divider-content">
      <slot />
    </div>
    <div class="divider-line divider-after" :class="{ 'divider-line-duan': contentPosition === 'right' }" :style="_line_style" />
  </div>
</template>
