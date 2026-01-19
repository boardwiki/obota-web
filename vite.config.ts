import {fileURLToPath, URL} from "node:url"
import tailwindcss from "@tailwindcss/vite"

import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5000,
  },
})
