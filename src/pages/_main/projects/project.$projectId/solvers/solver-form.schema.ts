import * as y from 'yup';

import { SolverUpdateRequest } from '~/pages/_main/projects/project.$projectId/solvers/solver-form.component';

export const createSolverFormSchema = (isEditing: boolean): y.ObjectSchema<SolverUpdateRequest> => {
  return y.object({
    name: y.string().required().default(''),
    description: y.string().default(''),
    fileId: isEditing ? y.string().required().default('') : y.string().default(''),
  });
};
