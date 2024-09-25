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
      { label: t('ACTION.EDIT'), onClick: handleEditNode },
      {
        label: t('ACTION.ADD_CATALOG'),
        onClick: handleAddCatalog,
        entityType: ContentNodeTypeEnum.Directory,
      },
      {
        label: t('ACTION.ADD_TABLE'),
        onClick: handleAddTable,
        entityType: ContentNodeTypeEnum.Directory,
      },
      {
        label: t('ACTION.EDIT_STRUCTURE'),
        onClick: handleEditStructure,
        entityType: ContentNodeTypeEnum.Table,
      },
      { label: t('ACTION.DELETE'), onClick: handleDeleteNode },
    ],
    [handleAddCatalog, handleAddTable, handleDeleteNode, handleEditNode, handleEditStructure, t],
  );

  return { menuItems };
};
