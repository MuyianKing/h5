<script setup>
import { ref } from 'vue'

const options = [
  {
    label: '苹果',
    value: 'apple',
  },
  {
    label: '梨子',
    value: 'pear',
  },
]

const value = ref([])
</script>

<template>
  <hl-main-body title="复选框">
    <div class="p-4">
      <hl-checkbox v-model="value" :options />
    </div>
  </hl-main-body>
</template>

<style lang='scss' scoped></style>
