import { TFunction } from 'i18next';
import * as y from 'yup';

import { CheckOpcode, DataType, ParameterField } from '~/api/utils/api-requests';
import { COMPARISON_TYPES } from '~/components/checks/checks.utils';
import { ParameterCheckFormData } from '~/components/forms/check/parameter-check/parameter-check-form.component';
import { positiveIntegerRe } from '~/utils/validation/utils/regexp';

export const getSchema = (
  leftValue: ParameterField,
  t: TFunction,
): y.ObjectSchema<ParameterCheckFormData> =>
  y.object({
    opCode: y
      .mixed<CheckOpcode>()
      .oneOf(Object.values(CheckOpcode))
      .default(CheckOpcode.GE)
      .required(),
    rightValue: y
      .mixed<ParameterCheckFormData['rightValue']>()
      .required()
      .test('rightValuePresent', { key: 'yup:mixed.required' }, value => value.name.length > 0)
      .when('opCode', ([opCode], schema) =>
        COMPARISON_TYPES.includes(opCode as CheckOpcode) && leftValue.type === DataType.String
          ? schema.test('isNumber', t('CHECKS.ERRORS.INT_EXPECTED'), value =>
              positiveIntegerRe.test(value.name),
            )
          : schema,
      ),
  });
