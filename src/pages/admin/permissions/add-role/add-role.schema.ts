import * as y from 'yup';

import { CreateRole } from '~/api/utils/api-requests';
import { nonEmptyStringYup, uuidYup } from '~/utils/validation/schemas/non-empty-string';

export const schema: y.ObjectSchema<CreateRole> = y.object().shape({
  title: nonEmptyStringYup,
  description: y.string().optional(),
  permissions: y.array().of(uuidYup.required()).optional(),
});

export const defaultValues: CreateRole = {
  title: '',
  description: '',
  permissions: [],
};
