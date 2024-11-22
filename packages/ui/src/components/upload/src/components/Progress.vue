<script setup name="UploadProgress">
import { useSlots } from 'vue'

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  progress: {
    type: Number,
    default: 0,
  },
})

const slots = useSlots()
</script>

<template>
  <teleport to="body">
    <div v-show="show" class="hl-progress-shadow">
      <div class="progress-body">
        <div class="title">
          正在上传...
        </div>
        <slot :percentage="progress" />
        <van-progress v-if="!slots.default" :stroke-width="20" :percentage="progress" class="progress" />
      </div>
    </div>
  </teleport>
</template>
