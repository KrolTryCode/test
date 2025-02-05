import * as y from 'yup';

import { CreateProjectParameterFormRequest } from '~/api/utils/api-requests';

export const schema: y.ObjectSchema<CreateProjectParameterFormRequest> = y.object({
  name: y.string().required().default(''),
});
