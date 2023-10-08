/// <reference types="vitest" />

import {defineConfig} from "vite"
import Vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"

export default defineConfig({
  plugins: [Vue(), AutoImport({
    imports: ["vue", "vue-router"],
  })],
  resolve: {
    alias: {
      "~": __dirname,
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
})
