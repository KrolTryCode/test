import * as y from 'yup';

import { ExternalLink } from '~/api/utils/api-requests';

export type IExternalLinkForm = Omit<ExternalLink, 'order'>;

export const schema: y.ObjectSchema<IExternalLinkForm> = y.object({
  name: y.string().required().default(''),
  url: y.string().required().default(''),
});
