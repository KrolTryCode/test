// src/components/forms/diagram/diagram-form.schema.ts
import * as y from 'yup';

import { DiagramRequest } from '~/api/utils/api-requests';

export const createDiagramFormSchema: y.ObjectSchema<DiagramRequest> = y.object({
  name: y.string().required().default(''),
  description: y.string().default(''),
  projectId: y.string().uuid().optional(),
});
