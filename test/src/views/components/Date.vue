<script setup>
import { ref } from 'vue'

const datetime = ref()
const date = ref()
</script>

<template>
  <hl-main-body title="日期">
    <div class="p-4">
      <hl-date v-model="datetime" class="mt-4" />

      <hl-date v-model="date" class="mt-4" format="YYYY-MM-DD" />
    </div>
  </hl-main-body>
</template>

<style lang='scss' scoped></style>
