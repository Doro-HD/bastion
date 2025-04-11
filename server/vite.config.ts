import path from 'path';

/// <reference types="vitest" />
import { defineConfig } from 'vite'
import build from '@hono/vite-build/node'
import devServer from "@hono/vite-dev-server";

export default defineConfig({
  plugins: [
    build({
      entry: './src/index.ts',
      port: 3000,
    }),
    devServer({
      entry: './src/index.ts',
    })
  ],
  resolve: {
    alias: {
        "@": path.resolve("./src/lib")
    }
  },
})