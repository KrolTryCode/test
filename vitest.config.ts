import { fileURLToPath } from 'url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
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
