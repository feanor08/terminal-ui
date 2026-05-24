import { defineConfig } from 'vite';
import { resolve } from 'path';

/** Emits dist/styles.css from src/styles.css (run after the main library build). */
export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    cssCodeSplit: true,
    cssMinify: true,
    lib: {
      entry: resolve(__dirname, 'src/styles.css'),
      formats: ['es'],
      fileName: 'styles-entry',
    },
    rollupOptions: {
      output: {
        assetFileNames: 'styles.css',
      },
    },
  },
});
