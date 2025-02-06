import * as y from 'yup';

import { IAddTaskForm } from '~/components/forms/task/task-form';

export const getSchema = (isEditing: boolean): y.ObjectSchema<IAddTaskForm> =>
  y.object({
    name: y.string().required().default(''),
    description: y.string().default(''),
    formId: isEditing ? y.string().uuid().default('') : y.string().uuid().required().default(''),
  });
