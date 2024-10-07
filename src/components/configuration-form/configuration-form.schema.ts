import * as y from 'yup';

import { PropertyInfo } from '~/components/configuration-form/configuration-form.type';
import { nonEmptyStringYup } from '~/utils/validation/schemas/strings';

export const getSchema = (properties: PropertyInfo[]) =>
  y.object().shape(
    Object.fromEntries(
      properties.map(prop => {
        switch (prop.type) {
          case 'Integer':
            return [prop.name, y.number().integer().min(0)];
          case 'Boolean':
            return [prop.name, y.boolean()];
          default:
            return [prop.name, nonEmptyStringYup];
        }
      }),
    ),
  );
