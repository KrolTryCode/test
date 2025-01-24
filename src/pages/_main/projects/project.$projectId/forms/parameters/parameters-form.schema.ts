import * as y from 'yup';

import { FormParameterInput } from '~/api/mocks/forms/parameters/types';

export const schema: y.ObjectSchema<FormParameterInput> = y.object({
  name: y.string().required().default(''),
  type: y.string().required().default(''),
  defaultValue: y.string().default(''),
});
