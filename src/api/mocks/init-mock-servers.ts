import MSWInterceptor from 'mirage-msw';
import { createServer } from 'miragejs';
import type { AnyFactories, AnyModels } from 'miragejs/-types';
import type { ServerConfig } from 'miragejs/server';

export type PartialServerConfig<
  Models extends AnyModels = AnyModels,
  Factories extends AnyFactories = AnyFactories,
> = Pick<ServerConfig<Models, Factories>, 'models' | 'factories' | 'seeds' | 'routes'>;

const serverConfigs: ServerConfig<AnyModels, AnyFactories>[] = [];

export const mockServer = createServer({
  //@ts-expect-error types
  interceptor: new MSWInterceptor(),
  logging: true,

  models: serverConfigs.reduce<AnyModels>(
    (models, server) => ({ ...models, ...server.models }),
    {},
  ),

  factories: serverConfigs.reduce<AnyFactories>(
    (factories, server) => ({ ...factories, ...server.factories }),
    {},
  ),

  seeds(server) {
    serverConfigs.forEach(serverConfig => serverConfig.seeds?.(server));
  },

  routes() {
    serverConfigs.forEach(serverConfig => serverConfig.routes?.apply(this));
  },
});
