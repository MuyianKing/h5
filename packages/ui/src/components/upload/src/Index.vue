<script setup>
import { AUDIO_SUFFIX, FILE_SUFFIX, guid } from '@hl/utils'
import { computed, inject, nextTick, onMounted, provide, ref, useSlots, watch } from 'vue'
import { closeLoading, error, loading } from '../../../utils/message'
import PreviewComp from './components/Preview.vue'
import UploadProgress from './components/Progress.vue'
import TriggerComp from './components/Trigger.vue'
import { getAllType } from './hooks/index'

const props = defineProps({
  // 文件类型 video：视频 image：图片 file：文件 audio：音频
  type: {
    type: [String, Array],
    default: 'image',
  },
  // 指定文件后缀用于过滤待选文件类型
  suffix: {
    type: [String, Array],
    default: '',
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // 最大上传数量
  maxCount: {
    type: Number,
    default: 99,
  },
  // 最小上传数量
  minCount: {
    type: Number,
    default: 9,
  },
  // 自动上传
  autoUpload: {
    type: Boolean,
    default: true,
  },
  // 进度条
  progress: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['upload-start', 'upload-finish'])

const { uploadFile } = inject('GLOBAL_CUSTOM_CONFIG', { uploadFile: null })

const slots = useSlots()

const files_value = defineModel({
  type: [Array, Object],
  default: null,
})

// 删除
function handleDel(row) {
  if (props.multiple) {
    const index = files_value.value.findIndex(item => item.id === row.id)
    if (index > -1) {
      files_value.value.splice(index, 1)
    }
  } else {
    files_value.value = null
  }
}

// 重新上传
let replace_file = null
const trigger_ref = ref()
function handleReupload(row) {
  trigger_ref.value.triggerAdd()
  replace_file = row
}

// 选择文件后
async function handleSelect(file) {
  let new_file = {
    id: guid(),
    name: file.name,
    path: URL.createObjectURL(file),
  }

  if (props.multiple) {
    // 未初始化过设为空数组
    if (!files_value.value) {
      files_value.value = []
    }

    await nextTick()

    let index = files_value.value.length

    // 是重新上传
    if (replace_file) {
      // 找到重新上传的文件的索引
      index = files_value.value.findIndex(item => item.id === replace_file.id)

      if (index > -1) {
        // 找到替换
        files_value.value.splice(index, 1, new_file)
      } else {
        // 未找到新增
        files_value.value.push(new_file)
        index = files_value.value.length - 1
      }
    } else {
      // 新增
      files_value.value.push(new_file)
    }

    new_file = files_value.value[index]
  } else {
    files_value.value = new_file
  }

  if (props.autoUpload) {
    // defineModel 有延迟
    await nextTick()

    // 自动上传
    setModelValue(new_file, {
      loading: true,
    })

    loading('正在上传...')

    try {
      const result = await handleUploadFile(file)
      setModelValue(new_file, {
        path: result.path,
        id: result.id,
        loading: false,
      })
      emits('upload-finish')
      closeLoading()
    } catch (e) {
      error(e, '上传失败')
    }
  } else {
    setModelValue(new_file, {
      file,
    })
  }
}

function setModelValue(new_file, row) {
  if (props.multiple) {
    Object.keys(row).forEach((key) => {
      new_file[key] = row[key]

      if (key === 'loading' && row[key] === false) {
        delete new_file[key]
      }
    })
  } else {
    Object.keys(row).forEach((key) => {
      files_value.value[key] = row[key]

      if (key === 'loading' && row[key] === false) {
        delete files_value.value[key]
      }
    })
  }
}

/**
 * 上传
 */
const progress_percent = ref(0)
const show_progress = ref(false)
async function handleUploadFile(file) {
  // 开始上传
  emits('upload-start')

  // 打开进度条
  if (props.progress) {
    show_progress.value = true
    progress_percent.value = 0
  }

  if (!uploadFile) {
    throw new Error('未配置上传方法')
  }

  // 上传
  const result = await uploadFile(file, {
    onProgress(e) {
      const cur_progress = Number.parseInt((e.loaded / e.total) * 100, 10)
      progress_percent.value = Number.parseInt(cur_progress, 10)
    },
  }).finally(() => {
    show_progress.value = false
    progress_percent.value = 0
  })

  // 上传成功
  if (result) {
    return result[0]
  }

  throw new Error('上传失败')
}

// 触发组件所需参数
const trigger_config = computed(() => {
  return {
    multiple: props.multiple,
    files: files_value.value,
    maxCount: props.maxCount,
    minCount: props.minCount,
    type: props.type,
    suffix: props.suffix,
    disabled: props.disabled,
  }
})

// 判断是否只有图片和视频
const is_only_video_image = computed(() => {
  const _file_type = getAllType(props.type, props.suffix)
  for (let i = 0; i < _file_type.length; i++) {
    if ([...AUDIO_SUFFIX, ...FILE_SUFFIX].includes(_file_type[i])) {
      return false
    }
  }
  return true
})

provide('is_only_video_image', is_only_video_image)

const nth = ref(0)

const _style = computed(() => {
  return {
    '--hl-preview-margin': props.multiple ? '5px' : '',
  }
})

const upload_ref = ref()

function calNth() {
  if (!upload_ref.value) {
    return
  }

  if (is_only_video_image.value) {
    const width = upload_ref.value.clientWidth
    nth.value = Math.floor((width - 5) / 110)
  } else {
    nth.value = 0
  }
}

watch(is_only_video_image, () => {
  calNth()
}, {
  immediate: true,
})

onMounted(() => {
  calNth()
})
</script>

<template>
  <div ref="upload_ref" v-bind="$attrs" class="hl-upload-wrapper" :class="{ 'flex-style': is_only_video_image }" :style="_style">
    <preview-comp v-if="!slots.preview" :file="files_value" :nth @delete="handleDel" @re-upload="handleReupload" />

    <slot v-else name="preview" />
    <trigger-comp v-if="!readonly" ref="trigger_ref" :config="trigger_config" :class="{ 'ml-0': nth === 0 || files_value?.length % nth === 0 }" @select-file="handleSelect">
      <template v-if="slots.default" #trigger>
        <slot />
      </template>
    </trigger-comp>
  </div>

  <!-- 上传进度条 -->
  <upload-progress v-if="progress" :show="show_progress" :progress="progress_percent">
    <template v-if="slots.progress" #default="{ percentage }">
      <slot name="progress" :percentage="percentage" />
    </template>
  </upload-progress>
</template>
