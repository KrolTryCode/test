import { spawnSync } from 'child_process';

import { config as loadEnv } from 'dotenv';

loadEnv();

const CORE_URL = process.env.CORE_URL;

if (!CORE_URL) {
  console.error('[.env] CORE_URL не задан');
  process.exit();
}

const npmAlias = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const isLocal = CORE_URL.includes('localhost') || CORE_URL.includes('host.docker.internal');
const runCommand = isLocal ? 'dev:local' : 'dev:remote';

spawnSync(npmAlias, ['run', runCommand], { stdio: 'inherit', shell: true });
