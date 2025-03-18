import { AddEntity, DataGrid, DeleteCellButton, EnhancedColDef } from '@pspod/ui-components';
import { FC, useMemo } from 'react';

import { CheckOpcode, TableCheck } from '~/api/utils/api-requests';
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
  const { t, getCheckOperatorsValueOptions, translateCheckOperatorType } = useCustomTranslations();

  const columns: EnhancedColDef<TableCheck>[] = useMemo(
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
        type: 'singleSelect',
        valueOptions: () => getCheckOperatorsValueOptions(Object.values(CheckOpcode)),
        groupingValueGetter: value => translateCheckOperatorType(value),
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
    [handleDeleteCheck, getCheckOperatorsValueOptions, t, parents, translateCheckOperatorType],
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

function getValue(parents: CheckParentType[], value: string): string {
  const id = typeof value === 'object' ? value['value'] : value;
  const parent = parents.find(column => column.id === id);
  return parent ? ('name' in parent ? parent.name : parent.displayName) : id;
}
