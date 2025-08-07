import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    middlewareMode: false,
    fs: {
      strict: true,
      allow: ['..']
    }
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  define: {
    global: "globalThis",
  },
  optimizeDeps: {
    include: ['@sanity/client', '@sanity/image-url'],
    exclude: []
  }
});
