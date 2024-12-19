import { TFunction } from 'i18next';
import * as y from 'yup';

import { ContentNodeType, CreateContentNodeRequest } from '~/api/utils/api-requests';

export const getSchema = (
  siblingNames: string[],
  t: TFunction,
): y.ObjectSchema<CreateContentNodeRequest> =>
  y.object({
    name: y.string().required().default('').notOneOf(siblingNames, t('ERROR.SIBLING_SAME_NAME')),
    projectId: y.string().uuid().required().default(''),
    parentNodeId: y.string().uuid().allowEmptyString(),
    type: y
      .mixed<ContentNodeType>()
      .oneOf(Object.values(ContentNodeType))
      .default(ContentNodeType.Directory)
      .required(),
  });
