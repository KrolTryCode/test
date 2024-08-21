import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { DropdownMenuItem, NavTreeItemData } from '~/components/nav-tree/nav-tree.type';
import { useNavTreeActions } from '~/pages/tables/tree/use-nav-tree-actions.hook';

export const useDropdownMenuItems = (treeData: NavTreeItemData[]) => {
  const { t } = useTranslation();
  const { handleAddCatalog, handleAddTable, handleDeleteNode, handleEditNode } =
    useNavTreeActions(treeData);

  const menuItems: DropdownMenuItem[] = useMemo(
    () => [
      { label: t('BUTTON.EDIT'), onClick: handleEditNode },
      { label: t('BUTTON.ADD_CATALOG'), onClick: handleAddCatalog },
      { label: t('BUTTON.ADD_TABLE'), onClick: handleAddTable },
      { label: t('BUTTON.DELETE'), onClick: handleDeleteNode },
    ],
    [handleAddCatalog, handleAddTable, handleDeleteNode, handleEditNode, t],
  );

  return { menuItems };
};
