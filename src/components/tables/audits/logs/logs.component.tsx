import { EnhancedColDef } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  commonAuditQueryParams,
  searchAuditsQueryOptions,
} from '~/api/queries/audits/search-audits.query';
import { FullAuditInfo } from '~/api/utils/api-requests';
import { DataGrid } from '~/components/datagrid/datagrid.component';

export const LogsTable: FC = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery(
    searchAuditsQueryOptions(commonAuditQueryParams, { criteria: [] }),
  );

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
      items={data?.content ?? []}
      pagingMode={'client'}
      totalCount={data?.totalElements ?? 0}
      columns={columns}
      loading={isLoading}
      hasExport
    />
  );
};
