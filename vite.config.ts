import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  // 注意注意
  // 此处修改了root根目录之后，像build这种原配置都是针对此root的路径。
  root: 'src/vue',
  // 修改编译结果index.html 中<script> 和 <link> 引用的src位置
  base: './',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/vue', import.meta.url))
    }
  },
  build:{
    // 编译结果目录
    outDir: '../../dist/vue',
  },
  server: {
    port: 9898
  },

})
