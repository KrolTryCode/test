import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Gender, Case } from 'russian-nouns-js';

import { ContentNodeType } from '~/api/utils/api-requests';
import { DropdownMenuItem, NavTreeItemData } from '~/components/nav-tree/nav-tree.type';
import { useNavTreeActions } from '~/pages/tables/tree/use-nav-tree-actions.hook';
import { useNounDeclination } from '~/utils/hooks/use-noun-declination';

export const useDropdownMenuItems = (treeData: NavTreeItemData[]) => {
  const { t } = useTranslation();
  const {
    handleAddCatalog,
    handleAddTable,
    handleDeleteNode,
    handleEditNode,
    handleEditStructure,
  } = useNavTreeActions(treeData);

  const useDeclinatedText = (text: string) =>
    useNounDeclination({
      text,
      gender: Gender.FEMININE,
      morphologicalCase: Case.ACCUSATIVE,
    });

  const declinedTableText = useDeclinatedText('ENTITY.TABLE');
  const declinedStructureText = useDeclinatedText('ENTITY.STRUCTURE');

  const menuItems: DropdownMenuItem[] = useMemo(
    () => [
      { label: t('ACTION.EDIT'), onClick: handleEditNode },
      {
        label: t('ACTION.ADD', { type: t('ENTITY.CATALOGUE').toLowerCase() }),
        onClick: handleAddCatalog,
        entityType: ContentNodeType.Directory,
      },
      {
        label: t('ACTION.ADD', { type: declinedTableText.toLowerCase() }),
        onClick: handleAddTable,
        entityType: ContentNodeType.Directory,
      },
      {
        label: t('ACTION.EDIT', { type: declinedStructureText.toLowerCase() }),
        onClick: handleEditStructure,
        entityType: ContentNodeType.Table,
      },
      { label: t('ACTION.DELETE'), onClick: handleDeleteNode },
    ],
    [
      declinedStructureText,
      declinedTableText,
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
