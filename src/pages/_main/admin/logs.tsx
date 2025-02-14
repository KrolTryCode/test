import { EnhancedColDef } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { searchAuditsQueryOptions } from '~/api/queries/audits/search-audits.query';
import { selectPageableData } from '~/api/selectors/pageable';
import { FullAuditInfo } from '~/api/utils/api-requests';
import { DataGrid } from '~/components/datagrid/datagrid.component';

export const Route = createFileRoute('/_main/admin/logs')({
  component: LogsPage,
  staticData: {
    title: 'NAVIGATION.LOGS',
    order: 5,
  },
});

function LogsPage() {
  const { t } = useTranslation();

  const { data: logsList, isLoading } = useQuery(
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
      { select: selectPageableData },
    ),
  );

  const columns = useMemo<EnhancedColDef<FullAuditInfo>[]>(
    () => [
      {
        field: 'created',
        headerName: t('JOURNAL.DATE'),
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
      loading={isLoading}
      items={logsList?.items ?? []}
      pagingMode={'client'}
      totalCount={logsList?.totalCount ?? 0}
      columns={columns}
      hasExport
    />
  );
}
