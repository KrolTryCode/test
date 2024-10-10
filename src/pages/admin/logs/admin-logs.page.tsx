import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchAuditsQuery } from '~/api/queries/audits/search-audits.query';
import { selectPageableData } from '~/api/selectors/pageable';
import { FullAuditInfo } from '~/api/utils/api-requests';
import { DataGrid } from '~/ui-components/datagrid/datagrid.component';
import { EnhancedColDef } from '~/ui-components/datagrid/datagrid.types';

const LogsPage: FC = () => {
  const { t } = useTranslation();

  const { data: logsList, isLoading } = useSearchAuditsQuery(
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
        headerName: t('LOGS.SOURCE'),
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
      hasToolbarFilters
    />
  );
};

export default LogsPage;
