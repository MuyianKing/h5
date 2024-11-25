<script setup>
import { Icon as VanIcon, Progress as VanProgress } from 'vant'
import { computed, inject, reactive, ref, watch } from 'vue'
import { error } from '../../../utils/message'

const props = defineProps({
  file: {
    type: Object,
    default: null,
  },
})

const { previewFileUrl } = inject('GLOBAL_CUSTOM_CONFIG', { previewFileUrl: null })

let audio = null
const player = reactive({
  // 状态
  status: 'pause',
  cur_timestamp: 0,
  duration: 0,
  duration_format: '00:00',
  error: '',
  show_progress: false,
})

function handleClick() {
  if (!audio) {
    return
  }

  player.show_progress = true

  if (player.error) {
    error(null, player.error)
    return
  }

  player.status = player.status === 'pause' ? 'playing' : 'pause'

  if (audio.paused) {
    audio.play()
  } else {
    audio.pause()
  }
}

const duration = ref('00:00')
watch(() => props.file, (val) => {
  audio && audio.pause()

  if (!audio) {
    audio = new Audio()
  }

  // 设置音频时长
  audio.oncanplay = () => {
    player.duration = audio.duration
    player.duration_format = dayjs.duration(player.duration, 's').format('HH:mm:ss').replace(/00:/, '')
  }

  // 更新当前进度
  audio.ontimeupdate = () => {
    player.cur_timestamp = audio.currentTime
    duration.value = dayjs.duration(player.cur_timestamp, 's').format('HH:mm:ss').replace(/00:/, '')
  }

  // 播放结束
  audio.onended = () => {
    player.status = 'pause'
    player.cur_timestamp = 0
  }

  // 播放错误
  audio.onerror = () => {
    player.error = '音频数据不存在，无法播放'
  }

  audio.src = previewFileUrl ? previewFileUrl(val.path, val.prefix) : val.path
}, {
  immediate: true,
})

// 进度条百分比
const percent = computed(() => {
  if (!player.duration) {
    return 0
  }

  const _percent = (player.cur_timestamp / player.duration).toFixed(4) * 100
  return Math.min(_percent, 100)
})
</script>

<template>
  <div class="hl-audio">
    <div class="left mr-2" @click="handleClick">
      <van-icon :name="player.status === 'pause' ? 'play-circle-o' : 'stop-circle-o'" />
    </div>
    <div class="flex-1 min-w-0 relative">
      <div class="w-full leading-4">
        <div class="line-clamp-1 break-all file-name">
          {{ file?.name }}
        </div>
        <div class="mt-1 mb-2 text-gray-400">
          <template v-if="player.show_progress">
            <span>{{ duration }}</span>
            <span class="mx-1">/</span>
          </template>
          <span>{{ player.duration_format }}</span>
        </div>
      </div>
      <van-progress v-if="player.show_progress" class="progress-item" :percentage="percent" pivot-text="." stroke-width="3" />
    </div>
  </div>
</template>
