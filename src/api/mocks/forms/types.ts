import { FormParameter } from '~/api/mocks/forms/parameters/types';

export interface TaskFormData {
  id: string;
  name: string;
  solverId?: string;
  tableIds?: string[];
  modellingTime?: string;
  author: string;
  created: string;
  parameters?: FormParameter[];
}

export type TaskFormInput = Omit<TaskFormData, 'id' | 'author' | 'created'>;
