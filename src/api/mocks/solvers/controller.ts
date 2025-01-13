import { Model } from 'miragejs';

import { PartialServerConfig } from '~/api/mocks/init-mock-servers';
import { Solver } from '~/api/mocks/solvers/types';
import { dateTimeToISOString } from '~/utils/date/formatters';

export const SOLVER_MOCK_SERVER_URLS = {
  GET_LIST: '/solvers/list',
  CREATE: '/solvers/create',
  DELETE: '/solvers/delete',
  UPDATE: '/solvers/update',
};

const mockModels = {
  solver: Model.extend<Solver>({
    id: '',
    name: '',
    description: '',
    fileId: '',
  }),
};

const mockFactories = {};

export const solverServer: PartialServerConfig<typeof mockModels, typeof mockFactories> = {
  models: mockModels,

  factories: mockFactories,

  seeds(server) {
    server.create('solver', {
      name: 'Solver 1',
      description: 'Solver 1 description',
      author: 'Author 1',
      created: '2022-01-01T01:00:00Z',
    });
    server.create('solver', {
      name: 'Solver 2',
      description: 'Solver 2 description',
      author: 'Author 2',
      created: '2022-02-01T02:00:00Z',
    });
  },

  routes() {
    this.post(`/api${SOLVER_MOCK_SERVER_URLS.CREATE}`, (schema, request) => {
      const attrs = JSON.parse(request.requestBody) as Solver;
      return schema.create('solver', {
        ...attrs,
        author: 'Test User',
        created: dateTimeToISOString(),
      });
    });

    this.post(`/api${SOLVER_MOCK_SERVER_URLS.UPDATE}`, (schema, request) => {
      const attrs = JSON.parse(request.requestBody) as Solver;
      const solver = schema.find('solver', attrs.id);
      if (solver) {
        solver.update(attrs);
        return solver;
      }
      return { message: `Solver with id ${request.params.id} not found` };
    });

    this.get(`/api${SOLVER_MOCK_SERVER_URLS.GET_LIST}`, schema => schema.all('solver').models);

    this.delete(`/api${SOLVER_MOCK_SERVER_URLS.DELETE}/:id`, (schema, request) => {
      schema
        .all('solver')
        .models.find(model => model.id === request.params.id)
        ?.destroy();
      return { message: `Solver with id ${request.params.id} deleted` };
    });
  },
};
