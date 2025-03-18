import { FC } from 'react';

import { useTableChecks } from '~/components/checks/table-checks/table-checks.hook';
import { ChecksTable } from '~/components/tables/checks/checks-table.component';

interface TableChecksProps {
  tableId: string;
}

export const TableChecks: FC<TableChecksProps> = ({ tableId }) => {
  const { checks, isLoading, deleteCheck, handleAddCheck, tableColumns } = useTableChecks(tableId);

  return (
    <ChecksTable
      checks={checks}
      isLoading={isLoading}
      handleDeleteCheck={deleteCheck}
      handleAddCheck={handleAddCheck}
      parents={tableColumns}
    />
  );
};
