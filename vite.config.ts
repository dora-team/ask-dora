import { svelte } from "@sveltejs/vite-plugin-svelte";
import path, { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        search: resolve(__dirname, "app/search.html"),
        chat: resolve(__dirname, "app/chat.html"),
        test: resolve(__dirname, "app/test.html"),
      },
    },
  },
  resolve: {
    alias: {
      $: path.resolve(__dirname, "./src"),
    },
  },
  plugins: [svelte()],
});
