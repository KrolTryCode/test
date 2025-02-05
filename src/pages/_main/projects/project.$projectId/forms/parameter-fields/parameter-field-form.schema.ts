import { TFunction } from 'i18next';
import * as y from 'yup';

import { DataType, ParameterField } from '~/api/utils/api-requests';
import { latinAndNumbersRe } from '~/utils/validation/utils/regexp';

export type ParameterFieldForm = Pick<
  ParameterField,
  'name' | 'key' | 'type' | 'isRequired' | 'defaultValue'
>;

export const getSchema = (t: TFunction): y.ObjectSchema<ParameterFieldForm> =>
  y.object({
    name: y.string().required().default(''),
    key: y
      .string()
      .required()
      .default('')
      .matches(latinAndNumbersRe, t('ERROR.LATIN_AND_NUMBERS_ONLY')),
    type: y.mixed<DataType>().oneOf(Object.values(DataType)).default(DataType.String).required(),
    defaultValue: y.string().default(''),
    isRequired: y.boolean().default(false),
  });
