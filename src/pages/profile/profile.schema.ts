import { TFunction } from 'i18next';
import * as z from 'zod';

import { UserData } from '~/api/utils/api-requests';
import { nonEmptyStringZod, phoneSchema } from '~/utils/validation/schemas/non-empty-string';
import { ZodInferSchema } from '~/utils/validation/utils/zod-infer-schema';

//!!! Omit is hotfix
export interface UpdateProfileForm extends Omit<Required<UserData>, 'source'> {
  patronymic: string;
  enterprise: string;
  subdivision: string;
  workPost: string;
  newPassword?: string;
  confirmPassword?: string;
  phone: string;
  timezone: string;
  language: string;
  notes: string;
  subscribe: boolean;
}

export const getSchema = (t: TFunction) =>
  z.object<ZodInferSchema<UpdateProfileForm>>({
    firstName: nonEmptyStringZod,
    lastName: nonEmptyStringZod,
    patronymic: z.string(),

    enterprise: z.string(),
    subdivision: z.string(),
    workPost: z.string(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),

    email: z
      .string()
      .email({ message: t('ERROR.INCORRECT', { what: t('USER.EMAIL').toLowerCase() }) }),
    subscribe: z.boolean(),
    phone: phoneSchema.or(z.literal('')),
    timezone: z.string(),
    language: z.string(),
    notes: z.string(),
  });

export const defaultValues: UpdateProfileForm = {
  firstName: '',
  lastName: '',
  email: '',
  patronymic: '',
  enterprise: '',
  subdivision: '',
  workPost: '',
  phone: '',
  timezone: '',
  language: '',
  notes: '',
  subscribe: false,
};
