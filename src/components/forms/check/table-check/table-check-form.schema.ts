import * as y from 'yup';

import { CheckOpcode } from '~/api/utils/api-requests';
import { TableCheckFormData } from '~/components/forms/check/table-check/table-check-form.component';

export const schema: y.ObjectSchema<TableCheckFormData> = y.object({
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
    ),
});
