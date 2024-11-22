<script setup>
import { getIcons } from '@server/icon'

function getData() {
  getIcons().then((data) => {
    console.log(data)
  })
}

getData()
</script>

<template>
  <hl-main-body title="图标">
    hello world
  </hl-main-body>
</template>

<style lang='scss' scoped></style>
