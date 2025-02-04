import * as y from 'yup';

import { ExternalLink } from '~/api/utils/api-requests';

export type ExternalLinkForm = Omit<ExternalLink, 'order'>;

export const schema: y.ObjectSchema<ExternalLinkForm> = y.object({
  name: y.string().required().default(''),
  url: y.string().required().default(''),
});
