import path from 'node:path';

import { config as loadEnv } from 'dotenv';
import { generateApi } from 'swagger-typescript-api';

loadEnv();

const CORE_URL = process.env.CORE_URL?.replace('host.docker.internal', '127.0.0.1');

if (!CORE_URL) {
  console.error('[.env] CORE_URL не задан');
  process.exit();
}

await generateApi({
  name: 'api-requests.ts',
  output: path.resolve('./src/api/utils'),
  url: CORE_URL + '/v3/api-docs',
  generateResponses: true,
  extractEnums: true,
  httpClientType: 'axios',
  unwrapResponseData: true,
  moduleNameFirstTag: true,
});
