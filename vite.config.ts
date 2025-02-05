import { fileURLToPath, URL } from 'url';

import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    TanStackRouterVite({
      routesDirectory: './src/pages',
      generatedRouteTree: './src/routing/routeTree.gen.ts',
      quoteStyle: 'single',
      semicolons: true,
      autoCodeSplitting: true,
      routeFileIgnorePattern:
        'component.tsx|modal.tsx|style.tsx?|hook.tsx?|test.tsx?|type.ts|schema.ts',
    }),
    react({ include: '**/*.tsx' }),
    viteTsconfigPaths(),
    svgrPlugin(),
  ],

  resolve: {
    alias: [
      { find: '~', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: 'tests', replacement: fileURLToPath(new URL('./tests', import.meta.url)) },
    ],
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },

  server: {
    open: false,
    host: true,
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },

  build: {
    outDir: 'build',
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
}));
