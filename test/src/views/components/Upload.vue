<script setup>
import { ref } from 'vue'

const mul_value = ref([
  {
    id: 'P1732240239360Po',
    name: '微信图片_20241115151750.png',
    path: '2024/11/22/P1732240239360Po.png',
  },
  {
    id: 'P1732240241666CM',
    name: '项目目录.png',
    path: '2024/11/22/P1732240241666CM.png',
  },
  {
    id: 'P1732240239360Po1',
    name: '微信图片_20241115151750.png',
    path: '2024/11/22/P1732240239360Po.png',
  },
  {
    id: 'P1732240241666CM2',
    name: '项目目录.png',
    path: '2024/11/22/P1732240241666CM.png',
  },
  {
    id: 'P1732240239360Po3',
    name: '微信图片_20241115151750.png',
    path: '2024/11/22/P1732240239360Po.png',
  },
  {
    id: 'P1732240241666CM4',
    name: '项目目录.png',
    path: '2024/11/22/P1732240241666CM.png',
  },
])
</script>

<template>
  <hl-main-body title="上传">
    <div class="p-4">
      <hl-upload />

      <div class="mt-4">
        <div class="sub-title">
          上传多个
        </div>
        <hl-upload v-model="mul_value" multiple />
      </div>
    </div>
  </hl-main-body>
</template>

<style lang='scss' scoped>
.sub-title {
  color: gray;
}
</style>
