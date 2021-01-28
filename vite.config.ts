import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginString from "vite-plugin-string";

export default defineConfig({
  plugins: [vue(), vitePluginString()],
  base: "/vite-shader-water/",
});
