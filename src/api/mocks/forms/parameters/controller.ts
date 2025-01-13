import { Model } from 'miragejs';

import { FormParameter } from '~/api/mocks/forms/parameters/types';
import { PartialServerConfig } from '~/api/mocks/init-mock-servers';
import { dateTimeToISOString } from '~/utils/date/formatters';

export const FORM_PARAMETERS_MOCK_SERVER_URLS = {
  GET_LIST: '/params/list',
  CREATE: '/params/create',
  DELETE: '/params/delete',
  UPDATE: '/params/update',
};

const mockModels = {
  param: Model.extend<FormParameter>({
    id: '',
    name: '',
    type: '',
  }),
};

const mockFactories = {};

export const paramsServer: PartialServerConfig<typeof mockModels, typeof mockFactories> = {
  models: mockModels,
  factories: mockFactories,
  seeds(server) {
    server.create('param', {
      name: 'TestParam1',
      type: 'string',
      defaultValue: 'Goddess of Stone',
    });
    server.create('param', {
      name: 'TestParam2',
      type: 'number',
      defaultValue: '300',
    });
  },

  routes() {
    this.post(`/api${FORM_PARAMETERS_MOCK_SERVER_URLS.CREATE}`, (schema, request) => {
      const attrs = JSON.parse(request.requestBody) as FormParameter;
      return schema.create('param', {
        ...attrs,
        author: 'Test User',
        created: dateTimeToISOString(),
      }).attrs;
    });

    this.post(`/api${FORM_PARAMETERS_MOCK_SERVER_URLS.UPDATE}`, (schema, request) => {
      const attrs = JSON.parse(request.requestBody) as FormParameter;
      const solver = schema.find('param', attrs.id);
      if (solver) {
        solver.update(attrs);
        return solver;
      }
      return { message: `Form with id ${request.params.id} not found` };
    });

    this.get(
      `/api${FORM_PARAMETERS_MOCK_SERVER_URLS.GET_LIST}`,
      schema => schema.all('param').models,
    );

    this.delete(`/api${FORM_PARAMETERS_MOCK_SERVER_URLS.DELETE}/:id`, (schema, request) => {
      schema
        .all('param')
        .models.find(model => model.id === request.params.id)
        ?.destroy();
      return { message: `Form with id ${request.params.id} deleted` };
    });
  },
};
