import * as y from 'yup';

import { LoginRequest } from '~/api/utils/api-requests';

export interface LoginForm extends Required<LoginRequest> {
  rememberMe: boolean;
}

export const schema: y.ObjectSchema<LoginForm> = y.object({
  username: y.string().default('').required(),
  password: y.string().default('').required(),
  rememberMe: y.boolean().default(false),
});
