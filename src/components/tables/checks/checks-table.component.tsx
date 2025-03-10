import { AddEntity, DataGrid, DeleteCellButton, EnhancedColDef } from '@pspod/ui-components';
import { FC, useMemo } from 'react';

import { CheckOpcode, TableCheck } from '~/api/utils/api-requests';
import { useChecks } from '~/components/tables/checks/checks-table.hook';
import { useCustomTranslations } from '~/utils/hooks';

interface CheckTableProps {
  tableId: string;
}

export const CheckTables: FC<CheckTableProps> = ({ tableId }) => {
  const { t, getCheckOperatorsValueOptions, translateCheckOperatorType } = useCustomTranslations();

  const { checks, isLoading, deleteCheck, handleAddCheck, tableColumns } = useChecks(tableId);

  const columns: EnhancedColDef<TableCheck>[] = useMemo(
    () => [
      {
        field: 'check.leftValue.value',
        headerName: t('CHECKS.LEFT_VALUE'),
        flex: 1,
        valueGetter: value => {
          const id = typeof value === 'object' ? value['value'] : value;
          return tableColumns.find(column => column.id === id)?.displayName;
        },
        groupingValueGetter: value => {
          const id = typeof value === 'object' ? value['value'] : value;
          return tableColumns.find(column => column.id === id)?.displayName;
        },
      },
      {
        field: 'check.opCode',
        headerName: t('CHECKS.OPERATOR'),
        flex: 1,
        type: 'singleSelect',
        valueOptions: () => getCheckOperatorsValueOptions(Object.values(CheckOpcode)),
        groupingValueGetter: value => translateCheckOperatorType(value),
      },
      {
        field: 'check.rightValue.value',
        headerName: t('CHECKS.RIGHT_VALUE'),
        flex: 1,
        valueGetter: value => {
          const innerValue = typeof value === 'object' ? value['value'] : value;
          return tableColumns.find(column => column.id === innerValue)?.displayName ?? innerValue;
        },
        groupingValueGetter: value => {
          const innerValue = typeof value === 'object' ? value['value'] : value;
          return tableColumns.find(column => column.id === innerValue)?.displayName ?? innerValue;
        },
      },
      {
        field: 'actions',
        type: 'actions',
        getActions({ row }) {
          return [
            <DeleteCellButton key={'delete'} deleteHandler={() => void deleteCheck(row.id)} />,
          ];
        },
      },
    ],
    [deleteCheck, getCheckOperatorsValueOptions, t, tableColumns, translateCheckOperatorType],
  );

  return (
    <DataGrid<TableCheck>
      items={checks}
      totalCount={checks.length}
      columns={columns}
      loading={isLoading}
      customToolbarContent={
        <AddEntity
          customText={t('ACTION.ADD', { type: t('ENTITY.CHECK').toLowerCase() })}
          onClick={handleAddCheck}
        />
      }
    />
  );
};
