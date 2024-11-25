import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentNodeType } from '~/api/utils/api-requests';
import { DropdownMenuItem, NavTreeItemData } from '~/components/nav-tree/nav-tree.type';
import { useNavTreeActions } from '~/pages/tables/tree/use-nav-tree-actions.hook';
import { useDeclinatedText } from '~/utils/hooks/use-declinated-text';

export const useDropdownMenuItems = (treeData: NavTreeItemData[]) => {
  const { t } = useTranslation();
  const {
    handleAddCatalog,
    handleAddTable,
    handleDeleteNode,
    handleEditNode,
    handleEditStructure,
  } = useNavTreeActions(treeData);

  const { declinatedTableText, declinatedStructureText } = useDeclinatedText();

  const menuItems: DropdownMenuItem[] = useMemo(
    () => [
      { label: t('ACTION.EDIT'), onClick: handleEditNode },
      {
        label: t('ACTION.ADD', { type: t('ENTITY.CATALOGUE').toLowerCase() }),
        onClick: handleAddCatalog,
        entityType: ContentNodeType.Directory,
      },
      {
        label: t('ACTION.ADD', { type: declinatedTableText.toLowerCase() }),
        onClick: handleAddTable,
        entityType: ContentNodeType.Directory,
      },
      {
        label: t('ACTION.EDIT', { type: declinatedStructureText.toLowerCase() }),
        onClick: handleEditStructure,
        entityType: ContentNodeType.Table,
      },
      { label: t('ACTION.DELETE'), onClick: handleDeleteNode, color: 'error' },
    ],
    [
      declinatedStructureText,
      declinatedTableText,
      handleAddCatalog,
      handleAddTable,
      handleDeleteNode,
      handleEditNode,
      handleEditStructure,
      t,
    ],
  );

  return { menuItems };
};
