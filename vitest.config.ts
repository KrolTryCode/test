import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), svgrPlugin(), viteTsconfigPaths()],
  test: {
    setupFiles: ['tests/setup/setup-tests.ts'],
    globals: true,
    snapshotSerializers: ['tests/utils/serializer.ts'],
    environment: 'happy-dom',
    exclude: ['data', 'node_modules', 'build'],
  },
  resolve: {
    alias: [
      { find: '~', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: 'tests', replacement: fileURLToPath(new URL('./tests', import.meta.url)) },
    ],
  },
});
