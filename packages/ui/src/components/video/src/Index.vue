<script setup>
import { openFullScreen } from '@hl/utils'
import { computed, inject, ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: 'auto',
  },
  width: {
    type: String,
    default: '100%',
  },
  // 是否显示控制条
  controls: {
    type: Boolean,
    default: false,
  },
  // 设置视频缩放模式
  fit: {
    type: String,
    default: 'contain',
  },
})

const { previewFileUrl } = inject('GLOBAL_CUSTOM_CONFIG', null)

const video_ref = ref()
function handleClick() {
  // 有控制条则不做任何操作
  if (props.controls) {
    return
  }

  // 全屏
  if (video_ref.value) {
    openFullScreen(video_ref.value)
    video_ref.value.play()
  }
}

// 查看地址
const prev_src = computed(() => {
  if (props.src && previewFileUrl) {
    return previewFileUrl(props.src)
  }
  return ''
})

const _style = computed(() => {
  return {
    '--hl-video-width': props.width,
    '--hl-video-height': props.height,
  }
})
</script>

<template>
  <div v-if="prev_src" class="hl-preview-video" :style="_style" @click="handleClick">
    <video ref="video_ref" class="w-full h-full" :controls :src="prev_src" :style="{ objectFit: fit }" />
    <slot />
  </div>
</template>
