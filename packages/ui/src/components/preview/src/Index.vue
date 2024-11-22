<script setup>
import { getType } from '@hl/utils'
import { computed, ref, watch } from 'vue'

import HlFile from '../../file'
import HlImage from '../../image'
import HlVideo from '../../video'

const props = defineProps({
  files: {
    type: [Array, Object],
    default: null,
  },
  height: {
    type: String,
    default: '100px',
  },
  width: {
    type: String,
    default: '100px',
  },
  controls: {
    type: Boolean,
    default: false,
  },
})

const _files = computed(() => {
  if (!props.files) {
    return []
  }
  const files = Array.isArray(props.files) ? props.files : typeof props.files === 'object' ? [props.files] : [{ path: props.files }]

  return files.map((item) => {
    item.type = getType(item.path) || getType(item.name)
    return item
  })
})

const _image_video = ref([])
const _not_image_video = ref([])
watch(_files, (val) => {
  _image_video.value = []
  _not_image_video.value = []

  val.forEach((item) => {
    if (item.type === 'image' || item.type === 'video') {
      _image_video.value.push(item)
    } else {
      _not_image_video.value.push(item)
    }
  })
}, {
  immediate: true,
})
</script>

<template>
  <div class="hl-preview" :style="{ '--hl-preview-first-file': _image_video.length === 0 ? 'none' : '' }">
    <template v-for="item in _image_video" :key="item.id">
      <hl-image v-if="item.type === 'image'" :height :width :src="item.path" fit="cover" />
      <hl-video v-else :src="item.path" :height :width :controls style="min-width: 200px;" />
    </template>

    <template v-for="item in _not_image_video" :key="item.id">
      <hl-file :file="item" class="w-full" />
    </template>
  </div>
</template>
