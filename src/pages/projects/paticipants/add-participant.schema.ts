import * as y from 'yup';

import { CreateProjectNodeMemberRequest } from '~/api/utils/api-requests';
import { UUIDSchema, dateMinSchema } from '~/utils/validation/schemas';

export interface IAddParticipantForm
  extends Omit<CreateProjectNodeMemberRequest, 'userId' | 'expirationTime'> {
  usersId: string[];
  expirationTime: Date | null;
}

export const schema: y.ObjectSchema<IAddParticipantForm> = y.object().shape({
  usersId: y.array(UUIDSchema).required(),
  roleId: UUIDSchema,
  expirationTime: dateMinSchema.nullable().default(null),
});
