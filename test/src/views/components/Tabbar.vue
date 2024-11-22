<script setup>
const tabbar_list = [
  {
    name: '组件',
    inactive: 'ant-design:home-outlined',
  },
  {
    name: '我的',
    inactive: 'icon-park-solid:user',
  },
]
</script>

<template>
  <hl-main-body title="tabbar栏">
    <div class="p-4">
      <hl-tabbar :list="tabbar_list" class="relative" />
    </div>
  </hl-main-body>
</template>

<style lang='scss' scoped>
</style>
