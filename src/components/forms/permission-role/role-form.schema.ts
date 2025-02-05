import * as y from 'yup';

import { CreateRole } from '~/api/utils/api-requests';
import { UUIDSchema } from '~/utils/validation/schemas';

export const schema: y.ObjectSchema<CreateRole> = y.object().shape({
  title: y.string().required().default(''),
  description: y.string().default(''),
  permissions: y.array().of(UUIDSchema).default([]),
});
