import { EnhancedColDef } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  commonAuditQueryParams,
  searchAuditsQueryOptions,
} from '~/api/queries/audits/search-audits.query';
import { selectAuditsByParentNode } from '~/api/selectors/select-audits-by-parent';
import { FullAuditInfo } from '~/api/utils/api-requests';
import { DataGrid } from '~/components/datagrid/datagrid.component';

interface EventsTableProps {
  parentNodeId?: string;
}

export const EventsTable: FC<EventsTableProps> = ({ parentNodeId }) => {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery(
    searchAuditsQueryOptions(
      commonAuditQueryParams,
      { criteria: [] },
      { select: data => selectAuditsByParentNode(data, parentNodeId) },
    ),
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
        field: 'authorName',
        headerName: t('COMMON.AUTHOR'),
        width: 200,
      },
      {
        field: 'action',
        headerName: t('JOURNAL.ACTION'),
        width: 200,
        flex: 1,
      },
    ],
    [t],
  );

  return (
    <DataGrid<FullAuditInfo>
      items={data ?? []}
      pagingMode={'client'}
      totalCount={data?.length ?? 0}
      columns={columns}
      loading={isLoading}
      hasExport
    />
  );
};
