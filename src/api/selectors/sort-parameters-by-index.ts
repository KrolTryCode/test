import { ParameterField } from '~/api/utils/api-requests';

export const sortParametersByIndex = (data: ParameterField[]): ParameterField[] =>
  data.sort((a, b) => a.index - b.index);
