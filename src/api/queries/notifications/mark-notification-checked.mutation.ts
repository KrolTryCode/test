import { useMutation, useQueryClient } from '@tanstack/react-query';

import { notificationsQueries } from '~/api/queries/notifications/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Notification } from '~/api/utils/api-requests';

interface MutationVariables {
  isChecked: boolean;
  notificationIds: string[];
}

export const useMarkNotificationMutation = (
  options?: UseCustomMutationOptions<Notification[], Error, MutationVariables>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Notification[], Error, MutationVariables>({
    mutationFn: ({ isChecked, notificationIds }) =>
      ApiClientSecured.notificationV1Controller.updateNotifications({ isChecked, notificationIds }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: notificationsQueries.list._def });
      options?.onSuccess?.(...args);
    },
  });
};
