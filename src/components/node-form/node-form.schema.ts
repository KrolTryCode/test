import * as y from 'yup';

import {
  CreateContentNodeRequest,
  CreateContentNodeRequestTypeEnum,
} from '~/api/utils/api-requests';
import { DEFAULT_PROJECT_ID } from '~/app/user/user.store';

export const schema: y.ObjectSchema<CreateContentNodeRequest> = y.object({
  name: y.string().required().default(''),
  projectId: y.string().uuid().required().default(DEFAULT_PROJECT_ID),
  parentId: y.string().uuid().allowEmptyString(),
  type: y
    .mixed<CreateContentNodeRequestTypeEnum>()
    .oneOf(Object.values(CreateContentNodeRequestTypeEnum))
    .default(CreateContentNodeRequestTypeEnum.Directory)
    .required(),
});
