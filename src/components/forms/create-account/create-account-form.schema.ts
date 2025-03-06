import * as y from 'yup';

import { UserData } from '~/api/utils/api-requests';

export type ICreateAccountForm = Pick<UserData, 'firstName' | 'lastName' | 'email'>;

export const schema: y.ObjectSchema<ICreateAccountForm> = y.object().shape({
  firstName: y.string().required().default(''),
  lastName: y.string().required().default(''),
  email: y.string().email().required().default(''),
});
