import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), qiankun('another-vue3', {useDevMode: true})],
  // 生产环境需要指定运行域名作为base
  base: 'http://127.0.0.1:7107/'
})
