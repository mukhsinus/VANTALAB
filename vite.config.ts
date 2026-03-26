import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api/contact': {
        target: 'https://script.google.com/macros/s/AKfycbzR0eBT5AhuMsSFQ-9BDWIQJS3PlZrrYg_PhyDQRRkRg6euhytM1DZLz2jPHJAZ0T6e/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/contact/, ''),
      }
    }
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['three'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
        }
      }
    }
  },
  ssr: {
    noExternal: ['three']
  }
}));
