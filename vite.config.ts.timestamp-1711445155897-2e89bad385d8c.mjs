// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/obota/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/obota/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/obota/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { VitePWA } from "file:///C:/obota/node_modules/vite-plugin-pwa/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/obota/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      srcDir: "src",
      filename: "service-worker.ts",
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
            purpose: "any"
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        categories: [
          "sports",
          "travel"
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    rollupOptions: {
      external: ["fsevents"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxsb25na2V0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxsb25na2V0XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9sb25na2V0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCJcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIFZpdGVQV0Eoe1xyXG4gICAgICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxyXG4gICAgICBkZXZPcHRpb25zOiB7XHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgICAgc3JjRGlyOiAnc3JjJyxcclxuICAgICAgZmlsZW5hbWU6ICdzZXJ2aWNlLXdvcmtlci50cycsXHJcbiAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgbmFtZTogXCJsb25na2V0XCIsXHJcbiAgICAgICAgc2hvcnRfbmFtZTogXCJsb25na2V0XCIsXHJcbiAgICAgICAgdGhlbWVfY29sb3I6IFwiI2ZmZmZmZlwiLFxyXG4gICAgICAgIHN0YXJ0X3VybDogXCIvXCIsXHJcbiAgICAgICAgZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogXCIjZmZmZmZmXCIsXHJcbiAgICAgICAgaWQ6IFwia29yZWEtYm9hcmQtYXBwXCIsXHJcbiAgICAgICAgc2NvcGU6IFwiL1wiLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIllvdSBjYW4gc2VlIHRoZSBpbmZvcm1hdGlvbiBvbiBLb3JlYW4gYm9hcmRzXCIsXHJcbiAgICAgICAgaWNvbnM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiBcIi9pY29uLTE5Mi5wbmdcIixcclxuICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgICBwdXJwb3NlOiBcImFueVwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiBcIi9pY29uLTUxMi5wbmdcIixcclxuICAgICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgICBwdXJwb3NlOiBcIm1hc2thYmxlXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgY2F0ZWdvcmllczogW1xyXG4gICAgICAgICAgXCJzcG9ydHNcIixcclxuICAgICAgICAgIFwidHJhdmVsXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgIH1cclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGV4dGVybmFsOiBbJ2ZzZXZlbnRzJ11cclxuICAgIH1cclxuICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9OLFNBQVMsZUFBZSxXQUFXO0FBQ3ZQLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsU0FBUyxlQUFlO0FBSnVHLElBQU0sMkNBQTJDO0FBT2hMLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLFlBQVk7QUFBQSxRQUNWLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQSxRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixXQUFXO0FBQUEsUUFDWCxTQUFTO0FBQUEsUUFDVCxrQkFBa0I7QUFBQSxRQUNsQixJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsUUFDYixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFlBQVk7QUFBQSxVQUNWO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxVQUFVO0FBQUEsSUFDdkI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
