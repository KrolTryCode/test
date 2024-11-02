import * as y from 'yup';

import { CreateProjectNodeRequest, ProjectNodeType } from '~/api/utils/api-requests';

export const schema: y.ObjectSchema<CreateProjectNodeRequest> = y.object({
  parentId: y.string().uuid().allowEmptyString(),
  name: y.string().required().default(''),
  description: y.string().default(''),
  type: y
    .mixed<ProjectNodeType>()
    .oneOf(Object.values(ProjectNodeType))
    .default(ProjectNodeType.Project)
    .required(),
});
