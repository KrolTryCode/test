import * as y from 'yup';

import { TaskFormInput } from '~/api/mocks/forms/types';

export const schema: y.ObjectSchema<Omit<TaskFormInput, 'parameters'>> = y.object({
  name: y.string().required().default(''),
  solverId: y.string().default(''),
  tableIds: y.array(y.string().default('')).default([]),
  modellingTime: y.string().default(''),
});
