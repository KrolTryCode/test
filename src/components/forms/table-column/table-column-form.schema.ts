import { TFunction } from 'i18next';
import * as y from 'yup';

import { CreateColumnRequest, DataType } from '~/api/utils/api-requests';

export interface ITableColumnForm extends Omit<CreateColumnRequest, 'nullable'> {
  required: boolean;
}

export const getSchema = (names: string[], t: TFunction): y.ObjectSchema<ITableColumnForm> =>
  y.object({
    name: y.string().required().default('').notOneOf(names, t('STRUCTURE.ERROR.NOT_UNIQUE_NAME')),
    type: y.mixed<DataType>().oneOf(Object.values(DataType)).default(DataType.String).required(),
    required: y.boolean().required().default(false),
    unique: y.boolean().required().default(false),
  });
