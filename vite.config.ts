import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import dotenv from 'dotenv'

const { parsed } = dotenv.config()
const {
  VITE_APP_MY_HOST,
  VITE_APP_MY_PORT,
} = parsed

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: VITE_APP_MY_HOST,
    port: Number(VITE_APP_MY_PORT),
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/assets/scss/common.scss";',
      },
    },
  },
  build: {
    outDir: 'docs',
  },
})
