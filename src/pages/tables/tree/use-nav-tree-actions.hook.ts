import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useDeleteNodeMutation } from '~/api/queries/nodes/delete-project-node.mutation';
import { DEFAULT_PROJECT_ID } from '~/app/application.store';
import { DropdownMenuItem } from '~/components/nav-tree/nav-tree.type';
import { notifySuccess } from '~/ui-components/notifications/notifications';
import { showErrorMessage } from '~/utils/show-error-message';

export const useNavTreeActions = () => {
  const { t } = useTranslation();
  const { mutateAsync: deleteNode } = useDeleteNodeMutation(DEFAULT_PROJECT_ID, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const handleEditNode = useCallback((id: string) => console.log('TODO onEdit', id), []);
  const handleAddCatalog = useCallback((id: string) => console.log('TODO onAddCatalog', id), []);
  const handleAddTable = useCallback((id: string) => console.log('TODO onAddTable', id), []);
  const handleDeleteNode = useCallback(async (id: string) => await deleteNode(id), []);

  const menuItems: DropdownMenuItem[] = useMemo(
    () => [
      { label: t('BUTTON.EDIT'), onClick: handleEditNode },
      { label: t('BUTTON.ADD_CATALOG'), onClick: handleAddCatalog },
      { label: t('BUTTON.ADD_TABLE'), onClick: handleAddTable },
      { label: t('BUTTON.DELETE'), onClick: handleDeleteNode },
    ],
    [handleDeleteNode],
  );

  return { menuItems };
};
