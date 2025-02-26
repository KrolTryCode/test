import { FileCardProps } from '@pspod/ui-components';
import * as y from 'yup';

import { SolverRequest } from '~/api/utils/api-requests';
import { fileSchema } from '~/utils/validation/schemas';

interface FileCardPropsExtended extends FileCardProps {
  file?: File;
}

export interface ISolverForm extends SolverRequest {
  file: FileCardPropsExtended | null;
  id?: string;
}

export const createSolverFormSchema = (forbiddenNames: string[]): y.ObjectSchema<ISolverForm> => {
  return y.object({
    name: y.string().notOneOf(forbiddenNames).required().default(''),
    description: y.string().default(''),
    file: fileSchema,
    id: y.string(),
  });
};
