import { notifySuccess, modal } from '@pspod/ui-components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { useAddColumnMutation } from '~/api/queries/tables/structure/add-column.mutation';
import { useDeleteColumnMutation } from '~/api/queries/tables/structure/delete-column.mutation';
import { useEditColumnNameMutation } from '~/api/queries/tables/structure/edit-column.mutation';
import { useGetTable } from '~/api/queries/tables/structure/get-table.query';
import { selectNodeColumns } from '~/api/selectors/select-node-columns';
import { CreateColumnRequest } from '~/api/utils/api-requests';
import { TableColumnForm } from '~/components/forms/table-column/table-column-form';
import { showErrorMessage } from '~/utils/show-error-message';

export const useProjectTableStructure = (tableId: string) => {
  const { t } = useTranslation();

  const {
    data: tableColumns = [],
    isLoading,
    isFetched,
  } = useGetTable(tableId, {
    select: selectNodeColumns,
  });

  const { mutate: dropColumn } = useDeleteColumnMutation(tableId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const { mutate: addColumn } = useAddColumnMutation(tableId, {
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutateAsync: handleEditColumn } = useEditColumnNameMutation(tableId);

  const handleAddColumn = useCallback(() => {
    modal({
      onOk: addColumn,
      title: t('STRUCTURE.ADD_COLUMN'),
      renderContent: (args: InstanceProps<CreateColumnRequest, never>) => (
        <TableColumnForm usedNames={tableColumns.map(c => c.name)} {...args} />
      ),
    });
  }, [addColumn, tableColumns, t]);

  return {
    tableColumns,
    isLoading,
    isFetched,
    handleDropColumn: dropColumn,
    handleEditColumn,
    handleAddColumn,
  };
};
