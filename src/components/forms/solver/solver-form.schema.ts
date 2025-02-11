import * as y from 'yup';

import { SolverRequest } from '~/api/utils/api-requests';

export interface SolverUpdateRequest extends SolverRequest {
  fileId?: string;
}

export const createSolverFormSchema = (
  forbiddenNames: string[],
  isEditing: boolean,
): y.ObjectSchema<SolverUpdateRequest> => {
  return y.object({
    name: y.string().notOneOf(forbiddenNames).required().default(''),
    description: y.string().default(''),
    fileId: isEditing ? y.string().required().default('') : y.string().default(''),
  });
};
