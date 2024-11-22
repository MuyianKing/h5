<script setup>
import { ref } from 'vue'

const value = ref()
</script>

<template>
  <hl-main-body title="输入框">
    <div class="bg-white p-4">
      <hl-input v-model="value" />
      <hl-input v-model="value" type="textarea" class="mt-4" placeholder="请输入文本域" />
    </div>
  </hl-main-body>
</template>

<style lang='scss' scoped>
</style>
