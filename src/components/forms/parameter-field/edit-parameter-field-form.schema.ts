import { TFunction } from 'i18next';
import * as y from 'yup';

import { DataType } from '~/api/utils/api-requests';
import { getDefaultValueSchema } from '~/components/forms/parameter-field/parameter-default-value';
import { ParameterFieldForm } from '~/components/forms/parameter-field/parameter-field.type';
import { latinAndNumbersRe } from '~/utils/validation/utils/regexp';

export const getSchema = (
  data: ParameterFieldForm,
  forbiddenKeys: string[],
  t: TFunction,
): y.ObjectSchema<ParameterFieldForm> =>
  y.object({
    name: y.string().required().default(''),
    key: y
      .string()
      .required()
      .default('')
      .matches(latinAndNumbersRe, t('ERROR.LATIN_AND_NUMBERS_ONLY'))
      .notOneOf(forbiddenKeys.filter(key => key !== data.key)),
    type: y.mixed<DataType>().oneOf(Object.values(DataType)).default(DataType.String),
    defaultValue: getDefaultValueSchema(data.type, data.key),
    isRequired: y.boolean().default(false),
  });
