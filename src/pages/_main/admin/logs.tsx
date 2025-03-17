import { createFileRoute } from '@tanstack/react-router';

import { LogsTable } from '~/components/tables/audits/logs/logs.component';

export const Route = createFileRoute('/_main/admin/logs')({
  component: LogsTable,
  staticData: {
    title: 'NAVIGATION.LOGS',
    order: 5,
  },
});
