import * as y from 'yup';

import { ContentNodeType, CreateContentNodeRequest } from '~/api/utils/api-requests';

export const schema: y.ObjectSchema<CreateContentNodeRequest> = y.object({
  name: y.string().required().default(''),
  projectId: y.string().uuid().required().default(''),
  parentId: y.string().uuid().allowEmptyString(),
  type: y
    .mixed<ContentNodeType>()
    .oneOf(Object.values(ContentNodeType))
    .default(ContentNodeType.Directory)
    .required(),
});
