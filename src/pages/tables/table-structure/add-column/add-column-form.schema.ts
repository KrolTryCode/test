import * as y from 'yup';

import { ColumnDefinition, ColumnType } from '~/api/utils/api-requests';

export const schema: y.ObjectSchema<ColumnDefinition> = y.object({
  name: y.string().required().default(''),
  columnType: y
    .mixed<ColumnType>()
    .oneOf(Object.values(ColumnType))
    .default(ColumnType.Varchar)
    .required(),
});
