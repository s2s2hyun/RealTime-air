import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";
import removeConsole from "vite-plugin-remove-console";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    removeConsole(),
    // VitePWA({
    //   registerType: "autoUpdate",
    //   devOptions: {
    //     enabled: true,
    //   },
    //   manifest: {
    //     name: "Realtime-Air",
    //     short_name: "Realtime-Air",
    //     description: "현재 위치기반 미세먼지 측정 데이터 공유",
    //     theme_color: "#ffffff",
    //     icons: [
    //       {
    //         src: "/pwa-192-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/pwa-512-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //     ],
    //     start_url: "/",
    //     display: "standalone",
    //     background_color: "#ffffff",
    //   },
    // }),
  ],
});
