import { ParameterField } from '~/api/utils/api-requests';

export type ParameterFieldForm = Pick<ParameterField, 'name' | 'key' | 'type' | 'isRequired'> & {
  defaultValue?: string | number | boolean | Date | string[] | null;
};
