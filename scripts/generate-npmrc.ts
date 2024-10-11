import fs from 'fs';

import { config as loadEnv } from 'dotenv';

loadEnv();

const NPM_TOKEN = process.env.NPM_TOKEN;

if (!NPM_TOKEN) {
  console.error('[.env] NPM_TOKEN не задан');
  process.exit();
}

const npmrcContent = `save-exact=true
@pspod:registry=https://gitlab.spbpu.com/api/v4/projects/487/packages/npm
//gitlab.spbpu.com/api/v4/projects/487/packages/npm/:_authToken=${NPM_TOKEN}`;

fs.writeFileSync('.npmrc', npmrcContent);

console.log('.npmrc файл был успешно сгенерирован');
