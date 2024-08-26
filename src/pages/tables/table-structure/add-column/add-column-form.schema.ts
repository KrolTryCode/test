import * as y from 'yup';

import { ColumnDefinition, ColumnDefinitionColumnTypeEnum } from '~/api/utils/api-requests';

export const schema: y.ObjectSchema<ColumnDefinition> = y.object({
  name: y.string().required().default(''),
  columnType: y
    .mixed<ColumnDefinitionColumnTypeEnum>()
    .oneOf(Object.values(ColumnDefinitionColumnTypeEnum))
    .default(ColumnDefinitionColumnTypeEnum.Varchar)
    .required(),
});
