import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      plugins: [react()],
      root: 'src/demo',
    };
  }

  return {
    plugins: [
      react(),
      dts({
        include: ['src/tokens', 'src/themes', 'src/components', 'src/index.ts'],
        outDir: 'dist',
        insertTypesEntry: true,
      }),
    ],
    build: {
      lib: {
        entry: {
          index: resolve(__dirname, 'src/index.ts'),
          'tokens/index': resolve(__dirname, 'src/tokens/index.ts'),
          'themes/index': resolve(__dirname, 'src/themes/index.ts'),
        },
        formats: ['es', 'cjs'],
        fileName: (format, entryName) =>
          `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
      },
      rollupOptions: {
        external: ['react', 'react/jsx-runtime', 'react-dom'],
        output: {
          preserveModules: false,
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
      cssCodeSplit: false,
    },
  };
});
