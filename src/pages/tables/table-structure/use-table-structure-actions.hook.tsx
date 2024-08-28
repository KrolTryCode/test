import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { useAddNodeColumnMutation } from '~/api/queries/nodes/structure/add-node-column.mutation';
import { useDeleteNodeColumnMutation } from '~/api/queries/nodes/structure/delete-node-column.mutation';
import { useEditNodeColumnNameMutation } from '~/api/queries/nodes/structure/edit-node-column.mutation';
import { ColumnDefinition } from '~/api/utils/api-requests';
import { modal } from '~/components/modal/modal';
import { AddColumnForm } from '~/pages/tables/table-structure/add-column/add-column-form.component';
import { notifySuccess } from '~/ui-components/notifications/notifications';
import { showErrorMessage } from '~/utils/show-error-message';

export const useTableStructureActions = (nodeId: string) => {
  const { t } = useTranslation();

  const { mutate: dropColumn } = useDeleteNodeColumnMutation(nodeId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const { mutate: addColumn } = useAddNodeColumnMutation(nodeId, {
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutateAsync: handleEditColumn } = useEditNodeColumnNameMutation(nodeId);

  const handleAddColumn = useCallback(() => {
    modal({
      onOk: addColumn,
      title: t('STRUCTURE.ADD_COLUMN'),
      renderContent: (args: InstanceProps<ColumnDefinition, never>) => <AddColumnForm {...args} />,
    });
  }, [addColumn, t]);

  return { handleDropColumn: dropColumn, handleEditColumn, handleAddColumn };
};
