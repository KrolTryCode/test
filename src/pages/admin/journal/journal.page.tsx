import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchAuditsQuery } from '~/api/queries/audits/search-audits.query';
import { selectPageableData } from '~/api/selectors/pageable';
import { FullAuditInfo } from '~/api/utils/api-requests';
import { DataGrid } from '~/ui-components/datagrid/datagrid.component';
import { EnhancedColDef } from '~/ui-components/datagrid/datagrid.types';

const JournalPage: FC = () => {
  const { t } = useTranslation();

  const { data: auditsList, isLoading } = useSearchAuditsQuery(
    { types: ['Task', 'ShipFactory'], pageable: { size: 99_999, page: 0 } },
    { criteria: [] },
    { select: selectPageableData },
  );

  const columns = useMemo<EnhancedColDef<FullAuditInfo>[]>(
    () => [
      {
        field: 'authorName',
        headerName: t('COMMON.AUTHOR'),
        flex: 1,
      },
      {
        field: 'action',
        headerName: t('JOURNAL.ACTION'),
        flex: 3,
      },
      {
        field: 'created',
        headerName: t('JOURNAL.DATE'),
        type: 'dateTime',
        flex: 1,
      },
    ],
    [t],
  );

  return (
    <DataGrid<FullAuditInfo>
      loading={isLoading}
      items={auditsList?.items ?? []}
      totalCount={auditsList?.totalCount ?? 0}
      columns={columns}
      hasExport
      hasToolbarFilters
    />
  );
};

export default JournalPage;
