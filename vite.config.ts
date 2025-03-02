import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      srcDir: 'src',
      filename: 'service-worker.ts',
      manifest: {
        name: "obota",
        short_name: "obota",
        theme_color: "#ffffff",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        id: "korea-board-app",
        scope: "/",
        description: "You can see the information on Korean boards",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        categories: [
          "sports",
          "travel"
        ]
      },
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      external: ['fsevents']
    }
  },
})
