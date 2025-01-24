import * as y from 'yup';

import { ServiceTokenRequest } from '~/api/utils/api-requests';
import { dateMinSchema } from '~/utils/validation/schemas';

export interface ICreateTokenForm extends Omit<ServiceTokenRequest, 'expirationDate'> {
  expirationDate: Date | null;
}

export const schema: y.ObjectSchema<ICreateTokenForm> = y.object().shape({
  name: y.string().required().default(''),
  description: y.string().default(''),
  expirationDate: dateMinSchema.required().default(null),
  roleId: y.string().uuid().required().default(''),
});
