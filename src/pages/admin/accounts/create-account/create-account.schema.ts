import * as y from 'yup';

import { UserData } from '~/api/utils/api-requests';

//!!! Omit is hotfix
export type CreateAccountForm = Omit<UserData, 'source' | 'id'>;

export const schema: y.ObjectSchema<CreateAccountForm> = y.object().shape({
  firstName: y.string().required().default(''),
  lastName: y.string().required().default(''),
  email: y.string().email().required().default(''),
});
