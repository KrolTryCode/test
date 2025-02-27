import { notifyInfo } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import { getNotificationsListOptions } from '~/api/queries/notifications/get-notifications-list.query';
import { useServerPagingParams } from '~/utils/hooks';

export const useNotifyAboutNewNotification = () => {
  const { data: notifications } = useQuery(
    getNotificationsListOptions(useServerPagingParams(), { refetchInterval: 5000 }),
  );
  const [total, setTotal] = useState(notifications?.totalElements ?? 0);

  useEffect(() => {
    const currentTotal = notifications?.totalElements ?? 0;
    if (currentTotal > total) {
      if (total !== 0) {
        for (let i = total; i < currentTotal; i++) {
          const text = notifications?.content?.at(i)?.message;
          if (text) {
            notifyInfo(text);
          }
        }
      }
      setTotal(currentTotal);
    }
  }, [notifications?.content, notifications?.totalElements, total]);
};
