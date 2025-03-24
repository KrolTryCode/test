import { TFunction } from 'i18next';
import * as y from 'yup';

import { CheckOpcode, DataType, TableColumn } from '~/api/utils/api-requests';
import { COMPARISON_TYPES } from '~/components/checks/checks.utils';
import { TableCheckFormData } from '~/components/forms/check/table-check/table-check-form.component';
import { positiveIntegerRe } from '~/utils/validation/utils/regexp';

export const getSchema = (
  columns: TableColumn[],
  t: TFunction,
): y.ObjectSchema<TableCheckFormData> =>
  y.object({
    opCode: y
      .mixed<CheckOpcode>()
      .oneOf(Object.values(CheckOpcode))
      .default(CheckOpcode.GE)
      .required(),
    leftValue: y.string().required(),
    rightValue: y
      .mixed<{ id: string; displayName: string }>()
      .required()
      .test(
        'rightValuePresent',
        { key: 'yup:mixed.required' },
        value => value.displayName.length > 0,
      )
      .when(['opCode', 'leftValue'], ([opCode, leftValue], schema) => {
        return COMPARISON_TYPES.includes(opCode as CheckOpcode) &&
          columns.find(column => column.id === leftValue)?.type === DataType.String
          ? schema.test('isNumber', t('CHECKS.ERRORS.INT_EXPECTED'), value =>
              positiveIntegerRe.test(value.displayName),
            )
          : schema;
      }),
  });
