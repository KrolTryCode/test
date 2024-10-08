import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClient } from '~/api/utils/api-client';
import { MESSAGES_MAP_KEY } from '~/api/utils/query-keys';

export const useDownloadMessagesMapQuery = <T = Record<string, string>>(
  options?: UseCustomQueryOptions<T>,
) => {
  const { i18n } = useTranslation();
  return useQuery<T>({
    queryKey: [MESSAGES_MAP_KEY, i18n.language],
    queryFn: async () =>
      (await ApiClient.messagesV1Controller.getMessagesMap({ startName: 'UI' })) as T,
    select: data => {
      const parsedData: Record<string, string> = {};
      for (const [key, value] of Object.entries(data as Record<string, string>)) {
        parsedData[key.replaceAll('UI.', '')] = value;
      }
      return parsedData as T;
    },
    staleTime: 86400,
    ...options,
  });
};
