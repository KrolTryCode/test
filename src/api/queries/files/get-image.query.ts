import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { File } from '~/api/utils/api-requests';

import { fileQueries } from './queries';

export const getImageQueryOptions = (imageId: string, options?: UseCustomQueryOptions<File>) =>
  queryOptions({
    ...fileQueries.downloadImage(imageId),
    enabled: !!imageId,
    ...options,
  });
