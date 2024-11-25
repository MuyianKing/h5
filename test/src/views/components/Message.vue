<script setup>
import { confirm, confirmDialog, error, loading, success, warning } from '@hl/h5/utils'
</script>

<template>
  <hl-main-body title="消息提示">
    <div class="p-4 flex flex-wrap">
      <hl-button type="danger" @click="error(null, '这是一条错误信息')">
        错误提示
      </hl-button>

      <hl-button type="success" @click="success('这是一条成功信息')">
        成功提示
      </hl-button>

      <hl-button type="warning" @click="warning('这是一条警告信息')">
        警告提示
      </hl-button>

      <hl-button type="info" @click="loading('加载中...', { duration: 3000 })">
        loading
      </hl-button>

      <hl-button type="warning" @click="confirm('这个是一个操作提示，用户可以选择继续或取消')">
        对话框
      </hl-button>

      <hl-button type="danger" @click="confirmDialog('这是一段提示信息，和业务没有联系，单纯提醒一下')">
        确认弹框
      </hl-button>
    </div>
  </hl-main-body>
</template>

<style lang='scss' scoped>
:deep(.hl-button) {
  margin: 5px;
}
</style>
