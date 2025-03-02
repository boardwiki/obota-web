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
      manifest: {
        name: "obota",
        short_name: "obota",
        theme_color: "#ffffff",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        id: "korea-longboard-app",
        scope: "/",
        description: "You can see the information on Korean longboards",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxsb25na2V0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxsb25na2V0XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9sb25na2V0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCJcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICB2dWVKc3goKSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXG4gICAgICBkZXZPcHRpb25zOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICB9LFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogXCJsb25na2V0XCIsXG4gICAgICAgIHNob3J0X25hbWU6IFwibG9uZ2tldFwiLFxuICAgICAgICB0aGVtZV9jb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgICAgIHN0YXJ0X3VybDogXCIvXCIsXG4gICAgICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAgICAgaWQ6IFwia29yZWEtbG9uZ2JvYXJkLWFwcFwiLFxuICAgICAgICBzY29wZTogXCIvXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIllvdSBjYW4gc2VlIHRoZSBpbmZvcm1hdGlvbiBvbiBLb3JlYW4gbG9uZ2JvYXJkc1wiLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCIvaWNvbi0xOTIucG5nXCIsXG4gICAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgcHVycG9zZTogXCJhbnlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCIvaWNvbi01MTIucG5nXCIsXG4gICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGNhdGVnb3JpZXM6IFtcbiAgICAgICAgICBcInNwb3J0c1wiLFxuICAgICAgICAgIFwidHJhdmVsXCJcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICB9KVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbJ2ZzZXZlbnRzJ11cbiAgICB9XG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvTixTQUFTLGVBQWUsV0FBVztBQUV2UCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsZUFBZTtBQUx1RyxJQUFNLDJDQUEyQztBQVFoTCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxZQUFZO0FBQUEsUUFDVixTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsV0FBVztBQUFBLFFBQ1gsU0FBUztBQUFBLFFBQ1Qsa0JBQWtCO0FBQUEsUUFDbEIsSUFBSTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxRQUNGO0FBQUEsUUFDQSxZQUFZO0FBQUEsVUFDVjtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsVUFBVTtBQUFBLElBQ3ZCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
