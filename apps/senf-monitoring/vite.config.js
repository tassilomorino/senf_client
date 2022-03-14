import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const pwaOptions = {
  devOptions: {
    enabled: true,
  },
  registerType: "autoUpdate",
  includeAssets: [],
  workbox: {
    globPatterns: ["**/*.{js,css,html,png,svg,ico,txt,woff,woff2,ttf}"],
  },
  manifest: {
    name: "Senf.koeln",
    short_name: "Senf ",
    description:
      "Digitale Beteiligung für ein lebenswerteres Kölner Stadtbild. Bürgerbeteiligung / Partizpation – niedrigschwellig, digital und mobil",
    theme_color: "#ffffff",
    icons: [
      {
        src: "android-chrome-192x192.png", // <== don't add slash, for testing
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png", // <== don't remove slash, for testing
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "android-chrome-512x512.png", // <== don't add slash, for testing
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions)],
});
