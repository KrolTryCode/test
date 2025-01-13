import { Model } from 'miragejs';

import { TaskFormData, TaskFormInput } from '~/api/mocks/forms/types';
import { PartialServerConfig } from '~/api/mocks/init-mock-servers';
import { dateTimeToISOString } from '~/utils/date/formatters';

export const FORMS_MOCK_SERVER_URLS = {
  GET_LIST: '/forms/list',
  GET: '/forms',
  CREATE: '/forms/create',
  DELETE: '/forms/delete',
  UPDATE: '/forms/update',
};

const mockModels = {
  form: Model.extend<TaskFormData>({
    id: '',
    name: '',
    author: '',
    created: '',
  }),
};

const mockFactories = {};

export const formServer: PartialServerConfig<typeof mockModels, typeof mockFactories> = {
  models: mockModels,

  factories: mockFactories,

  seeds(server) {
    server.create('form', {
      name: 'Form 1',
      modellingTime: 'some time',
      tableIds: ['1', '2'],
      author: 'Author 1',
      created: '1914-07-28T01:00:00Z',
    });
    server.create('form', {
      name: 'Form 2',
      author: 'Author 2',
      solverId: '1',
      created: '1939-09-01T02:00:00Z',
      parameters: [
        { id: '0', name: 'Some Param', type: 'no idea' },
        { id: '1', name: 'Another Param', type: 'some', defaultValue: '1' },
      ],
    });
  },

  routes() {
    this.post(`/api${FORMS_MOCK_SERVER_URLS.CREATE}`, (schema, request) => {
      const attrs = JSON.parse(request.requestBody) as TaskFormInput;
      return schema.create('form', {
        ...attrs,
        author: 'Test User',
        created: dateTimeToISOString(),
      }).attrs;
    });

    this.post(`/api${FORMS_MOCK_SERVER_URLS.UPDATE}`, (schema, request) => {
      const attrs = JSON.parse(request.requestBody) as TaskFormData;
      const form = schema.find('form', attrs.id);
      if (form) {
        form.update(attrs);
        return form;
      }
      return { message: `Form with id ${request.params.id} not found` };
    });

    this.get(`/api${FORMS_MOCK_SERVER_URLS.GET_LIST}`, schema => schema.all('form').models);

    this.get(
      `/api${FORMS_MOCK_SERVER_URLS.GET}/:formId`,
      (schema, request) =>
        schema.all('form').models.find(model => model.id === request.params.formId)?.attrs ?? null,
    );

    this.delete(`/api${FORMS_MOCK_SERVER_URLS.DELETE}/:id`, (schema, request) => {
      schema
        .all('form')
        .models.find(model => model.id === request.params.id)
        ?.destroy();
      return { message: `Form with id ${request.params.id} deleted` };
    });
  },
};
