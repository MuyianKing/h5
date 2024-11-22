import tabs from './tabbar'

/**
 * 路由配置
 * @type {import('vue-router').RouteRecordRaw[]}
 */
export default [
  {
    path: '/',
    redirect: '/tabs/home/index',
  },
  {
    path: '/login',
    component: () => import('@views/login/Index.vue'),
    meta: {
      title: '登录',
    },
  },
  tabs,
  {
    path: '/button',
    component: () => import('@views/components/Button.vue'),
    meta: {
      title: '按钮',
    },
  },
  {
    path: '/avatar',
    component: () => import('@views/components/Avatar.vue'),
    meta: {
      title: '头像',
    },
  },
  {
    path: '/checkbox',
    component: () => import('@views/components/Checkbox.vue'),
    meta: {
      title: '复选框',
    },
  },
  {
    path: '/date',
    component: () => import('@views/components/Date.vue'),
    meta: {
      title: '日期',
    },
  },
  {
    path: '/divider',
    component: () => import('@views/components/Divider.vue'),
    meta: {
      title: '分割线',
    },
  },
  {
    path: '/form',
    component: () => import('@views/components/Form.vue'),
    meta: {
      title: '表单',
    },
  },
  {
    path: '/icon',
    component: () => import('@views/components/Icon.vue'),
    meta: {
      title: '图标',
    },
  },
  {
    path: '/image',
    component: () => import('@views/components/Image.vue'),
    meta: {
      title: '图片',
    },
  },
  {
    path: '/input',
    component: () => import('@views/components/Input.vue'),
    meta: {
      title: '输入框',
    },
  },
  {
    path: '/radio',
    component: () => import('@views/components/Radio.vue'),
    meta: {
      title: '单选框',
    },
  },
  {
    path: '/select',
    component: () => import('@views/components/Select.vue'),
    meta: {
      title: '下拉框',
    },
  },
  {
    path: '/tabbar',
    component: () => import('@views/components/Tabbar.vue'),
    meta: {
      title: 'Tabbar',
    },
  },
  {
    path: '/top',
    component: () => import('@views/components/Top.vue'),
    meta: {
      title: '导航栏',
    },
  },
  {
    path: '/video',
    component: () => import('@views/components/Video.vue'),
    meta: {
      title: '视频',
    },
  },
  {
    path: '/upload',
    component: () => import('@views/components/Upload.vue'),
    meta: {
      title: '上传',
    },
  },
  {
    path: '/list',
    component: () => import('@views/components/List.vue'),
    meta: {
      title: '列表',
    },
  },
  {
    path: '/table',
    component: () => import('@views/components/Table.vue'),
    meta: {
      title: '表格',
    },
  },
  {
    path: '/file',
    component: () => import('@views/components/File.vue'),
    meta: {
      title: '文件',
    },
  },
  {
    path: '/audio',
    component: () => import('@views/components/Audio.vue'),
    meta: {
      title: '音频',
    },
  },
  {
    path: '/preview',
    component: () => import('@views/components/Preview.vue'),
    meta: {
      title: '所有文件',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@views/404.vue'),
  },
]
