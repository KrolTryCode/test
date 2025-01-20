import { notifySuccess, modal } from '@pspod/ui-components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { useAddColumnMutation } from '~/api/queries/tables/structure/add-column.mutation';
import { useDeleteColumnMutation } from '~/api/queries/tables/structure/delete-column.mutation';
import { useEditColumnNameMutation } from '~/api/queries/tables/structure/edit-column.mutation';
import { TableColumnExtended } from '~/api/selectors/select-node-columns';
import { CreateColumnRequest } from '~/api/utils/api-requests';
import { AddColumnForm } from '~/pages/tables/table-structure/add-column/add-column-form.component';
import { showErrorMessage } from '~/utils/show-error-message';

export const useTableStructureActions = (nodeId: string, nodeCols: TableColumnExtended[] = []) => {
  const { t } = useTranslation();

  const { mutate: dropColumn } = useDeleteColumnMutation(nodeId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const { mutate: addColumn } = useAddColumnMutation(nodeId, {
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutateAsync: handleEditColumn } = useEditColumnNameMutation(nodeId);

  const handleAddColumn = useCallback(() => {
    modal({
      onOk: addColumn,
      title: t('STRUCTURE.ADD_COLUMN'),
      renderContent: (args: InstanceProps<CreateColumnRequest, never>) => (
        <AddColumnForm usedNames={nodeCols.map(c => c.name)} {...args} />
      ),
    });
  }, [addColumn, nodeCols, t]);

  return { handleDropColumn: dropColumn, handleEditColumn, handleAddColumn };
};
