import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
/* import { visualizer } from "rollup-plugin-visualizer"; */
// npm run build will create a file stats.html in root directory

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react() /* , visualizer({ gzipSize: true, brotliSize: true } )*/],
  };
});
