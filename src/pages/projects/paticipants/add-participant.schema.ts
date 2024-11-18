import * as y from 'yup';

import { CreateProjectNodeMemberRequest } from '~/api/utils/api-requests';
import { UUIDSchema } from '~/utils/validation/schemas';

export interface IAddParticipantForm extends Omit<CreateProjectNodeMemberRequest, 'userId'> {
  usersId: string[];
}

export const schema: y.ObjectSchema<IAddParticipantForm> = y.object().shape({
  usersId: y.array(UUIDSchema).required(),
  roleId: UUIDSchema,
  expirationTime: y.string(),
});
