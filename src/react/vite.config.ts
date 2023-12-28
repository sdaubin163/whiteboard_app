import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 指定index.html的路径
  // root: path.join(__dirname, 'src'),
  // publicDir: path.join(__dirname, 'public'),
  // 修改编译结果index.html 中<script> 和 <link> 引用的src位置
  base: './',
  build: {
    outDir: path.join(__dirname, '../../dist/react'),
  },
  server: {
    port: 9899,
  },
  clearScreen: false,
  // // optimizeDeps: {
  // //   exclude: ['@tldraw/assets'],
  // // },
  // define: {
  //   'process.env.TLDRAW_ENV': JSON.stringify(process.env.VERCEL_ENV ?? 'development'),
  // },
})


