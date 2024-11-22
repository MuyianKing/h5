<script setup>
import { getType } from '@hl/utils'
import { computed, inject } from 'vue'

import HlIcon from '../../../icon'
import HlImage from '../../../image'
import HlVideo from '../../../video'
import PreviewItem from './PreviewItem.vue'

const props = defineProps({
  file: {
    type: [Array, String, Object],
    default: '',
  },
  nth: {
    type: Number,
    default: 0,
  },
})

const emits = defineEmits(['delete', 're-upload'])

// 删除
function handleDel(row) {
  emits('delete', row)
}

// 重新上传
function handleChange(row) {
  emits('re-upload', row)
}

const _files = computed(() => {
  if (!props.file) {
    return []
  }
  const files = Array.isArray(props.file) ? props.file : typeof props.file === 'object' ? [props.file] : [{ path: props.file }]

  return files.map((item) => {
    return {
      ...item,
      type: getType(item.path) || getType(item.name),
    }
  })
})

const is_only_video_image = inject('is_only_video_image')
</script>

<template>
  <div v-for="(_file, index) in _files" :key="_file.id" class="preview-wrapper nth-item" :class="{ 'ml-0': nth === 0 || index % nth === 0 }">
    <preview-item v-if="!is_only_video_image" :file="_file" class="py-1" @delete="handleDel(_file)" @re-upload="handleChange(_file)" />

    <template v-else>
      <hl-image v-if="_file.type === 'image'" :src="_file.path" height="100px" width="100px" fit="cover" @click="handleChange(_file)" />
      <hl-video v-else :src="_file.path" height="100px" width="100px" @click="handleChange(_file)" />
      <div class="delete-wrapper">
        <hl-icon class="icon-close" icon="icon-park-outline:close-small" color="#fff" :size="16" @click="handleDel(_file)" />
      </div>
    </template>
  </div>
</template>
