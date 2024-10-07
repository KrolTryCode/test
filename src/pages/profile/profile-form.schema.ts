import * as y from 'yup';

import { UserData } from '~/api/utils/api-requests';
import { phoneSchema } from '~/utils/validation/schemas';

//!!! Omit is hotfix
export interface UpdateProfileForm extends Omit<Required<UserData>, 'source'> {
  patronymic?: string;
  enterprise?: string;
  subdivision?: string;
  workPost?: string;
  newPassword?: string;
  confirmPassword?: string;
  phone?: string;
  timezone?: string;
  language?: string;
  notes?: string;
  subscribe?: boolean;
}

export const schema: y.ObjectSchema<UpdateProfileForm> = y.object({
  firstName: y.string().required(),
  lastName: y.string().required(),
  patronymic: y.string().required(),
  email: y.string().email().required(),

  enterprise: y.string(),
  subdivision: y.string(),
  workPost: y.string(),
  newPassword: y.string(),
  confirmPassword: y.string(),
  subscribe: y.boolean().default(false),
  phone: phoneSchema,
  timezone: y.string(),
  language: y.string(),
  notes: y.string(),
});
