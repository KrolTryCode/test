import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClient } from '~/api/utils/api-client';

export const localeQueries = createQueryKeys('locale', {
  messagesMap: (lang: string) => ({
    queryKey: [lang],
    queryFn: () => ApiClient.messagesV1Controller.getMessagesMap({ startName: 'UI' }),
  }),
});
