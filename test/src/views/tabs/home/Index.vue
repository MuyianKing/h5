<script setup>
import { jump } from '@hl/utils'
import { Cell } from 'vant'
import 'vant/es/cell/style/index.mjs'

const components = [
  {
    title: '基础组件',
    children: [
      {
        label: 'hl-button 按钮',
        path: '/button',
      },
      {
        label: 'hl-avatar 头像',
        path: '/avatar',
      },
      {
        label: 'hl-divider 分割线',
        path: '/divider',
      },
      {
        label: 'hl-icon 图标',
        path: '/icon',
      },
      {
        label: 'hl-table 表格',
        path: '/table',
      },
    ],
  },
  {
    title: '表单组件',
    children: [
      {
        label: 'hl-form 表单',
        path: '/form',
      },
      {
        label: 'hl-input 输入框',
        path: '/input',
      },
      {
        label: 'hl-select 下拉框',
        path: '/select',
      },
      {
        label: 'hl-radio 单选框',
        path: '/radio',
      },
      {
        label: 'hl-checkbox 复选框',
        path: '/checkbox',
      },
      {
        label: 'hl-date 日期',
        path: '/date',
      },
      {
        label: 'hl-upload 上传',
        path: '/upload',
      },
    ],
  },
  {
    title: '文件组件',
    children: [
      {
        label: 'hl-image 图片',
        path: '/image',
      },
      {
        label: 'hl-video 视频',
        path: '/video',
      },
      {
        label: 'hl-audio 音频',
        path: '/audio',
      },
      {
        label: 'hl-file 文件',
        path: '/file',
      },
      {
        label: 'hl-preview 所有文件',
        path: '/preview',
      },
    ],
  },
  {
    title: '导航组件',
    children: [
      {
        label: 'hl-top 导航栏',
        path: '/top',
      },
      {
        label: 'hl-tabbar Tabbar栏',
        path: '/tabbar',
      },
      {
        label: 'hl-list 列表',
        path: '/list',
      },
    ],
  },
  {
    title: '方法',
    children: [
      {
        label: 'message 消息提示',
        path: '/message',
      },
    ],
  },
]

const router = useRouter()
function handleClick(row) {
  jump({
    path: row.path,
  }, router)
}
</script>

<template>
  <div class="h-full overflow-y-auto">
    <div class="desc-item">
      基于vant定制的移动端业务组件
    </div>

    <div class="px-6 mt-8">
      <div v-for="(comps, index) in components" :key="index" class="mb-8">
        <div class="mb-2 text-gray-400 pl-[22px]">
          {{ comps.title }}
        </div>
        <div>
          <cell v-for="comp in comps.children" :key="comp.apth" class="rounded-[22px] text-lg mb-4" :title="comp.label" is-link @click="handleClick(comp)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.desc-item {
  @apply px-10;
  padding-top: 40px;
  color: gray;
  font-size: 16px;
}

:deep(.van-cell__title) {
  font-weight: bold;
  color: #34495e;
}
</style>
