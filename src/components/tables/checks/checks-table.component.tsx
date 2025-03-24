import { AddEntity, DataGrid, DeleteCellButton, EnhancedColDef } from '@pspod/ui-components';
import { FC, useCallback, useMemo } from 'react';

import { DataType } from '~/api/utils/api-requests';
import { CheckParentType, CheckType } from '~/components/checks/checks.type';
import { useCustomTranslations } from '~/utils/hooks';

interface CheckTableProps {
  checks: CheckType[];
  isLoading: boolean;
  handleDeleteCheck: (id: string) => void;
  handleAddCheck: () => void;
  parents: CheckParentType[];
}

export const ChecksTable: FC<CheckTableProps> = ({
  checks,
  isLoading,
  handleDeleteCheck,
  handleAddCheck,
  parents,
}) => {
  const { t, translateCheckOperatorType, translateStringCheckOperatorType } =
    useCustomTranslations();

  const getOperatorValues = useCallback(
    (row: CheckType, value: string) => {
      const innerValue =
        typeof row.check.leftValue?.value === 'object' && 'value' in row.check.leftValue.value
          ? row.check.leftValue?.value['value']
          : row.check.leftValue?.value;
      const rowType = parents.find(par => par.id === innerValue)?.type;
      if (rowType === DataType.String) {
        return translateStringCheckOperatorType(value);
      } else {
        return translateCheckOperatorType(value);
      }
    },
    [parents, translateCheckOperatorType, translateStringCheckOperatorType],
  );

  const columns: EnhancedColDef<CheckType>[] = useMemo(
    () => [
      {
        field: 'check.leftValue.value',
        headerName: t('CHECKS.LEFT_VALUE'),
        flex: 1,
        valueGetter: value => getValue(parents, value),
        groupingValueGetter: value => getValue(parents, value),
      },
      {
        field: 'check.opCode',
        headerName: t('CHECKS.OPERATOR'),
        flex: 1,
        valueGetter: (value, row) => getOperatorValues(row, value),
        groupingValueGetter: (value, row) => getOperatorValues(row, value),
      },
      {
        field: 'check.rightValue.value',
        headerName: t('CHECKS.RIGHT_VALUE'),
        flex: 1,
        valueGetter: value => getValue(parents, value),
        groupingValueGetter: value => getValue(parents, value),
      },
      {
        field: 'actions',
        type: 'actions',
        getActions({ row }) {
          return [
            <DeleteCellButton
              key={'delete'}
              deleteHandler={() => void handleDeleteCheck(row.id)}
            />,
          ];
        },
      },
    ],
    [t, parents, getOperatorValues, handleDeleteCheck],
  );

  return (
    <DataGrid<CheckType>
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

function getValue(parents: CheckParentType[], value: string): string {
  const id = typeof value === 'object' ? value['value'] : value;
  const parent = parents.find(column => column.id === id);
  return parent ? ('name' in parent ? parent.name : parent.displayName) : id;
}
