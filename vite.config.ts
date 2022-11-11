import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
      injectRegister: "auto",
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /https:\/\/moodle-worker-api\.glaciyan\.cc\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "course-cache",
            },
          },
        ],
      },
      manifest: {
        name: "HTWG Moodle Shortcuts",
        short_name: "Moodle",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/maskable_icon_192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/maskable_icon_512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        theme_color: "#4870fd",
        background_color: "#4870fd",
      },
    }),
  ],
  build: {
    sourcemap: true,
  },
});
