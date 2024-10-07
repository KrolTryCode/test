import * as y from 'yup';

import { CreateRole } from '~/api/utils/api-requests';
import { UUIDSchema } from '~/utils/validation/schemas';
import { nonEmptyStringYup } from '~/utils/validation/schemas/strings';

export const schema: y.ObjectSchema<CreateRole> = y.object().shape({
  title: nonEmptyStringYup,
  description: y.string().optional(),
  permissions: y.array().of(UUIDSchema).optional(),
});

export const defaultValues: CreateRole = {
  title: '',
  description: '',
  permissions: [],
};
