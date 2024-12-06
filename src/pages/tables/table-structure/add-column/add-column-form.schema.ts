import { TFunction } from 'i18next';
import * as y from 'yup';

import { ColumnDefinition, ColumnType } from '~/api/utils/api-requests';

export const getSchema = (names: string[], t: TFunction): y.ObjectSchema<ColumnDefinition> =>
  y.object({
    name: y.string().required().default('').notOneOf(names, t('STRUCTURE.ERROR.NOT_UNIQUE_NAME')),
    columnType: y
      .mixed<ColumnType>()
      .oneOf(Object.values(ColumnType))
      .default(ColumnType.Varchar)
      .required(),
  });
