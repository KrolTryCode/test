import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentNodeType } from '~/api/utils/api-requests';
import { DropdownMenuItem, NavTreeItemData } from '~/components/nav-tree/nav-tree.type';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';

import { useNavTreeActions } from './use-nav-tree-actions.hook';

export const useDropdownMenuItems = (treeData: NavTreeItemData[]) => {
  const { t } = useTranslation();
  const {
    handleAddCatalog,
    handleAddTable,
    handleDeleteNode,
    handleEditNode,
    handleEditStructure,
  } = useNavTreeActions(treeData);

  const declinatedTranslations = useDeclinatedTranslationsContext();

  const menuItems: DropdownMenuItem[] = useMemo(
    () => [
      {
        label: t('ACTION.EDIT'),
        onClick: handleEditNode,
      },
      {
        label: t('ACTION.ADD', { type: declinatedTranslations.DIRECTORY.ACCUSATIVE.toLowerCase() }),
        onClick: handleAddCatalog,
        entityType: ContentNodeType.Directory,
      },
      {
        label: t('ACTION.ADD', { type: declinatedTranslations.TABLE.ACCUSATIVE.toLowerCase() }),
        onClick: handleAddTable,
        entityType: ContentNodeType.Directory,
      },
      {
        label: t('ACTION.EDIT', {
          type: declinatedTranslations.STRUCTURE.ACCUSATIVE.toLowerCase(),
        }),
        onClick: handleEditStructure,
        entityType: ContentNodeType.Table,
      },
      {
        label: t('ACTION.DELETE'),
        onClick: id => void handleDeleteNode(id),
        color: 'error',
      },
    ],
    [
      declinatedTranslations.DIRECTORY.ACCUSATIVE,
      declinatedTranslations.STRUCTURE.ACCUSATIVE,
      declinatedTranslations.TABLE.ACCUSATIVE,
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
