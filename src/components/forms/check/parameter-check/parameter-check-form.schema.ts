import * as y from 'yup';

import { CheckOpcode } from '~/api/utils/api-requests';
import { ParameterCheckFormData } from '~/components/forms/check/parameter-check/parameter-check-form.component';

export const schema: y.ObjectSchema<ParameterCheckFormData> = y.object({
  opCode: y
    .mixed<CheckOpcode>()
    .oneOf(Object.values(CheckOpcode))
    .default(CheckOpcode.GE)
    .required(),
  rightValue: y
    .mixed<ParameterCheckFormData['rightValue']>()
    .required()
    .test('rightValuePresent', { key: 'yup:mixed.required' }, value => value.name.length > 0),
});
