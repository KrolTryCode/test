import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentNodeTypeEnum } from '~/api/utils/api-requests';
import { DropdownMenuItem, NavTreeItemData } from '~/components/nav-tree/nav-tree.type';
import { useNavTreeActions } from '~/pages/tables/tree/use-nav-tree-actions.hook';

export const useDropdownMenuItems = (treeData: NavTreeItemData[]) => {
  const { t } = useTranslation();
  const {
    handleAddCatalog,
    handleAddTable,
    handleDeleteNode,
    handleEditNode,
    handleEditStructure,
  } = useNavTreeActions(treeData);

  const menuItems: DropdownMenuItem[] = useMemo(
    () => [
      { label: t('BUTTON.EDIT'), onClick: handleEditNode },
      {
        label: t('BUTTON.ADD_CATALOG'),
        onClick: handleAddCatalog,
        entityType: ContentNodeTypeEnum.Directory,
      },
      {
        label: t('BUTTON.ADD_TABLE'),
        onClick: handleAddTable,
        entityType: ContentNodeTypeEnum.Directory,
      },
      {
        label: t('BUTTON.EDIT_STRUCTURE'),
        onClick: handleEditStructure,
        entityType: ContentNodeTypeEnum.Table,
      },
      { label: t('BUTTON.DELETE'), onClick: handleDeleteNode },
    ],
    [handleAddCatalog, handleAddTable, handleDeleteNode, handleEditNode, handleEditStructure, t],
  );

  return { menuItems };
};
