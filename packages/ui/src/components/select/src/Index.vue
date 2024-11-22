<script setup>
import { useDebounceFn } from '@vueuse/core'
import { cloneDeep } from 'lodash-es'
import { Icon as VanIcon, Popup as VanPopup } from 'vant'
import { ref, watch } from 'vue'
import HlInput from '../../input'
import vMore from './vMore'

const props = defineProps({
  options: {
    type: Array,
    default() {
      return []
    },
  },
  modelValue: {
    type: [String, Number, Array],
    default: '',
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: Boolean,
    default: false,
  },
  searchPlaceholder: {
    type: String,
    default: '请输入查询',
  },
})

const emits = defineEmits(['update:modelValue', 'scrolltolower', 'change', 'search'])

const query = defineModel('query', {
  type: String,
  default: '',
})

// 显示选择
const show = ref(false)

function handleShow() {
  // 只读不显示
  if (props.readonly) {
    return
  }
  show.value = true
}

// 选择
let last_selected = null

function select(item) {
  if (!props.multiple && last_selected) {
    last_selected.selected = false
  }
  last_selected = item
  item.selected = !item.selected
}

// 取消选择
function cancle() {
  setDataList(true)
  show.value = false
}

const dataList = ref([])

// 确定
function submit() {
  const new_selected = []
  dataList.value.forEach((item) => {
    if (item.children) {
      item.children.forEach((childrens) => {
        if (childrens.selected) {
          new_selected.push(childrens.value)
        }
      })
    } else {
      if (item.selected) {
        new_selected.push(item.value)
      }
    }
  })

  const val = Array.from(new Set(new_selected)).join(',')
  emits('update:modelValue', val)
  emits('change', val)
  show.value = false
}

let options = []

// list或modelValue变化重新计算dataList
function setDataList(link_value) {
  const list = []
  const selected = props.modelValue
    .toString()
    .split(',')
    .filter(item => item)

  if (options) {
    options.forEach((item) => {
      let new_item = {}
      if (item.children) {
        new_item = { ...item }
      } else {
        if (link_value) {
          item.selected = selected.includes(item.value.toString())
        }
        new_item = item
      }
      list.push(new_item)

      if (item.children) {
        item.children.forEach((childrens) => {
          if (childrens.selected) {
            last_selected = childrens
          }
        })
      } else {
        if (new_item.selected) {
          last_selected = new_item
        }
      }
    })
    dataList.value = list
  }
}

const selected_list = ref([])

watch(() => props.modelValue, (val) => {
  const selected = val.toString().split(',').filter(item => item)
  const new_list = []

  // 去掉去掉的
  selected_list.value.forEach((item) => {
    const index = selected.findIndex(sel => sel === item.value)
    if (index > -1) {
      new_list.push(item)
      selected.splice(index, 1)
    }
  })

  options.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        if (selected.includes(child.value.toString())) {
          new_list.push(child)
        }
      })
    } else {
      if (selected.includes(item.value.toString())) {
        new_list.push(item)
      }
    }
  })

  selected_list.value = new_list
})

watch(() => props.modelValue, () => {
  setDataList(true)
}, {
  immediate: true,
})

watch(() => props.options, (value) => {
  options = cloneDeep(value)
  setDataList()
}, {
  immediate: true,
})

const loadMore = useDebounceFn(() => {
  emits('scrolltolower')
}, 100)
</script>

<template>
  <div class="hl-mul-select-index">
    <div class="show-body" @click="handleShow">
      <!-- 展示已选择 -->
      <div v-if="selected_list.length > 0" class="selected-list">
        <div v-for="item in selected_list" :key="item.value" class="selected-item" :class="{ signer: !multiple }">
          <div v-if="item.children">
            <div v-for="child in item.children" :key="child.value" class="line-clamp-1">
              {{ child.label }}
            </div>
          </div>
          <div v-else class="line-clamp-1">
            {{ item.label }}
          </div>
        </div>
      </div>
      <div v-else class="placeholder">
        {{ placeholder }}
      </div>
      <div>
        <van-icon v-if="!readonly" name="arrow-down" style="transition: all linear 0.3s" :style="{ transform: `rotate(${show ? 180 : 0}deg)` }" class="arrow-down" />
        <slot name="icon" />
      </div>
    </div>
    <van-popup :show="show" round position="bottom" safe-area-inset-bottom @close="show = false">
      <div class="hl-popup-body">
        <div class="btns">
          <div class="cancle" @click="cancle">
            取消
          </div>
          <div class="confirm" @click="submit">
            确定
          </div>
        </div>
        <div v-if="filter" class="search-body">
          <hl-input v-model="query" class="h-full" :placeholder="searchPlaceholder" @input="emits('search', query)" />
        </div>
        <div v-more="loadMore" class="item-list">
          <div v-for="item in dataList" :key="item.value" class="item">
            <div v-if="item.children">
              <div class="title-data">
                <span class="text">{{ item.label }}</span>
              </div>
              <div v-for="child in item.children" :key="child.value" class="content-data" :style="{ color: child.selected ? '#1980F1' : '' }" @click="select(child)">
                <span>{{ child.label }}</span>
                <van-icon v-show="child.selected" class="selected" name="success" />
              </div>
            </div>
            <div v-else>
              <div :style="{ color: item.selected ? '#1980F1' : '' }" @click="select(item)">
                <span>{{ item.label }}</span>
                <van-icon v-show="item.selected" class="selected" name="success" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
