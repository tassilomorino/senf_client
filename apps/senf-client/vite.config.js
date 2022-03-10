import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { esbuildCommonjs, viteCommonjs } from "@originjs/vite-plugin-commonjs";

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
  };
});
