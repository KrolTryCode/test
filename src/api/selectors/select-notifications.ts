import { PageNotification } from '~/api/utils/api-requests';

export const selectNotifications = (
  notifications: PageNotification,
  isOnlyUnreadShown: boolean,
): PageNotification => {
  const filteredContent = isOnlyUnreadShown
    ? notifications.content?.filter(item => !item.isChecked)
    : notifications.content;

  return { ...notifications, content: filteredContent };
};

export const selectUnreadNotificationsCount = (notifications: PageNotification) =>
  notifications.content?.filter(item => !item.isChecked).length;
