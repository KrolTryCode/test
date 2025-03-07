import * as y from 'yup';

import { phoneSchema } from '~/utils/validation/schemas';

//TODO: make connection with UpdateUserRequest from API
export interface UpdateUserRequestNullable {
  firstName?: string | null;
  lastName?: string | null;
  surName?: string | null;
  email?: string | null;
  company?: string | null;
  division?: string | null;
  position?: string | null;
  phoneNumber?: string | null;
  timeZoneId?: number | null;
}

export const schema: y.ObjectSchema<UpdateUserRequestNullable> = y.object({
  firstName: y.string().required(),
  lastName: y.string().required(),
  surName: y.string().nullable(),
  email: y.string().email().required().default(''),

  company: y.string().nullable(),
  division: y.string().nullable(),
  position: y.string().nullable(),
  phoneNumber: phoneSchema.nullable(),
  timeZoneId: y.number().nullable(),
});
