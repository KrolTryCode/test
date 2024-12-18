import * as y from 'yup';

import { SolverFormInput } from '~/api/mocks/solvers/types';

export const schema: y.ObjectSchema<SolverFormInput> = y.object({
  name: y.string().required().default(''),
  description: y.string().default(''),
  fileId: y.string().required().default(''),
});
