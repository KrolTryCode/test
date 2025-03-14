import * as y from 'yup';

import { RealFullTaskInfo } from '~/api/queries/projects/tasks/get-project-task.query';
import { UUIDSchema } from '~/utils/validation/schemas';

export interface ITaskForm {
  name: string;
  description?: string;
  formId: string;
  parameters?: Omit<RealFullTaskInfo['parameters']['params'], 'timeout'>;
}

const parameterSchema: y.ObjectSchema<ITaskForm['parameters']> = y.object({
  solver: UUIDSchema.required(),
  contents: y.array(UUIDSchema).min(1, { key: 'yup:mixed.required' }).required().default([]),
  timeout: y.string().required(),
});

export const getSchema = (isEditing: boolean): y.ObjectSchema<ITaskForm> =>
  y.object({
    name: y.string().required().default(''),
    description: y.string().default(''),
    formId: isEditing ? y.string().uuid().default('') : y.string().uuid().required().default(''),
    parameters: isEditing ? y.mixed() : parameterSchema,
  });
