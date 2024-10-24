import * as y from 'yup';

import {
  CreateProjectNodeRequest,
  CreateProjectNodeRequestTypeEnum,
} from '~/api/utils/api-requests';

export const schema: y.ObjectSchema<CreateProjectNodeRequest> = y.object({
  parentId: y.string().uuid().allowEmptyString(),
  name: y.string().required().default(''),
  description: y.string().default(''),
  type: y
    .mixed<CreateProjectNodeRequestTypeEnum>()
    .oneOf(Object.values(CreateProjectNodeRequestTypeEnum))
    .default(CreateProjectNodeRequestTypeEnum.Project)
    .required(),
});
