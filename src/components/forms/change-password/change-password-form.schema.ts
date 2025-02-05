import { TFunction } from 'i18next';
import * as y from 'yup';

import { AccountConfiguration } from '~/api/utils/api-requests';
import { getPasswordSchema } from '~/utils/validation/schemas';

export interface ChangePasswordForm {
  password: string;
  confirmedPassword: string;
}

export const getSchema = (passwordConfig: AccountConfiguration, t: TFunction) =>
  y.object({
    password: getPasswordSchema(passwordConfig, t).required().default(''),
    confirmedPassword: y
      .string()
      .required()
      .when('password', ([password], schema) => {
        const pRe = new RegExp(`^${password}$`);
        return schema.matches(pRe, { message: { key: 'yup:custom.passwordMismatch' } });
      })
      .default(''),
  });
