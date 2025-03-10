import * as y from 'yup';

import { CheckOpcode } from '~/api/utils/api-requests';
import { CheckFormData } from '~/components/forms/check/check-form.component';

export const schema: y.ObjectSchema<CheckFormData> = y.object({
  opCode: y
    .mixed<CheckOpcode>()
    .oneOf(Object.values(CheckOpcode))
    .default(CheckOpcode.GE)
    .required(),
  leftValue: y.string().required(),
  rightValue: y.mixed<{ id: string; displayName: string }>().required(),
});
