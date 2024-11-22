import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { HlUIAlias } from './plugins/alias.js'

const __dirname = fileURLToPath(import.meta.url)

export default defineConfig({
  build: {
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      external: [
        /^@hl\//,
        /^vant/,
        '@vant/use',
        'vue',
        '@vueuse/core',
        'dayjs',
        'lodash-es',
        'validator',
        'js-cookie',
        'nanoid',
        '@iconify/vue',
        /^@multiavatar\/multiavatar/,
      ],
      output: [
        {
          format: 'es',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'packages/ui',
          dir: './dist/ui',
          entryFileNames: '[name].js',
          assetFileNames: '[name][extname]',
        },
      ],
      treeshake: false,
    },
    lib: {
      entry: [
        resolve(__dirname, '../index.js'),
        resolve(__dirname, '../resolver.js'),
        resolve(__dirname, '../utils.js'),
      ],
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    HlUIAlias(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
