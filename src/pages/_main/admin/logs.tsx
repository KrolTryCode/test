import { EnhancedColDef } from '@pspod/ui-components';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { searchAuditsQueryOptions } from '~/api/queries/audits/search-audits.query';
import { FullAuditInfo } from '~/api/utils/api-requests';
import { DataGrid } from '~/components/datagrid/datagrid.component';

export const Route = createFileRoute('/_main/admin/logs')({
  component: LogsPage,
  staticData: {
    title: 'NAVIGATION.LOGS',
    order: 5,
  },
  loader: async ({ context: { queryClient } }) => {
    const data = await queryClient.fetchQuery(
      searchAuditsQueryOptions(
        {
          types: [
            'Authentication',
            'Password',
            'Role',
            'User',
            'Account',
            'ProjectMember',
            'GroupMember',
          ],
          pageable: { size: 99_999, page: 0 },
        },
        { criteria: [] },
      ),
    );
    return { items: data.content ?? [], totalCount: data.totalElements ?? 0 };
  },
});

function LogsPage() {
  const { t } = useTranslation();

  const logsList = Route.useLoaderData();

  const columns = useMemo<EnhancedColDef<FullAuditInfo>[]>(
    () => [
      {
        field: 'created',
        headerName: t('COMMON.DATE'),
        type: 'dateTime',
        width: 160,
      },
      {
        field: 'action',
        headerName: t('JOURNAL.ACTION'),
        width: 200,
        flex: 1,
      },
      {
        field: 'authorName',
        headerName: t('COMMON.SOURCE'),
        width: 200,
      },
      {
        field: 'type',
        headerName: t('LOGS.EVENT_TYPE'),
      },
      {
        field: 'criticality',
        headerName: t('LOGS.EVENT_CRITICALITY'),
        width: 200,
      },
      {
        field: 'id',
        headerName: t('LOGS.ID'),
        width: 300,
      },
    ],
    [t],
  );

  return (
    <DataGrid<FullAuditInfo>
      items={logsList?.items ?? []}
      pagingMode={'client'}
      totalCount={logsList?.totalCount ?? 0}
      columns={columns}
      hasExport
    />
  );
}
