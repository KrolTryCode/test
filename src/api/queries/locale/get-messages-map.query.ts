import { useQuery } from '@tanstack/react-query';

import { localeQueries } from '~/api/queries/locale/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';

export const useDownloadMessagesMapQuery = (lang: string, options?: UseCustomQueryOptions) => {
  return useQuery({
    ...localeQueries.messagesMap(lang),
    select: data => {
      const parsedData: Record<string, string> = {};
      for (const [key, value] of Object.entries(data as Record<string, string>)) {
        parsedData[key.replaceAll('UI.', '')] = value;
      }
      return parsedData;
    },
    staleTime: 86400,
    ...options,
  });
};
