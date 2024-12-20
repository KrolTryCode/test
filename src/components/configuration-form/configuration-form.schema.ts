import * as y from 'yup';

import { PropertyInfo } from '~/api/utils/api-requests';

export const getSchema = (properties: PropertyInfo[]) =>
  y.object().shape(
    Object.fromEntries(
      properties.map(prop => {
        switch (prop.type) {
          case 'Integer':
            return [prop.name, y.number().integer().min(0)];
          case 'Boolean':
            return [prop.name, y.boolean()];
          case undefined:
          default:
            return [prop.name];
        }
      }),
    ),
  );
