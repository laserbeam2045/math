import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // host: '10.4.1.155',
    host: '192.168.3.17',
    port: 5555,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/assets/scss/common.scss";',
      },
    },
  },
})
