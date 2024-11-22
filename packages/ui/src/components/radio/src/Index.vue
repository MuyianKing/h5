<script setup>
import { Radio as VanRadio, RadioGroup as VanRadioGroup } from 'vant'

defineProps({
  options: {
    type: Array,
    default() {
      return []
    },
  },
  // 排列方式（默认横向） 'vertical' || 'horizontal'
  direction: {
    type: String,
    default: 'horizontal',
  },
  // 图标大小
  iconSize: {
    type: [String, Number],
    default: '20px',
  },
})

defineEmits(['change'])
</script>

<template>
  <van-radio-group class="hl-radio" v-bind="$attrs" :direction="direction" :icon-size="iconSize" @change="$emit('change', $event)">
    <van-radio v-for="item in options" :key="item.value" :name="item.value">
      {{ item.label }}
    </van-radio>
  </van-radio-group>
</template>
