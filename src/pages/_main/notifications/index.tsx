import { createFileRoute } from '@tanstack/react-router';

import { NotificationsTable } from '~/components/tables/notifications/notifications.component';

export const Route = createFileRoute('/_main/notifications/')({
  component: NotificationsTable,
  staticData: { title: 'NAVIGATION.NOTIFICATIONS' },
});
