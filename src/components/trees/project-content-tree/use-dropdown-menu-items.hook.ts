import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentNodeType } from '~/api/utils/api-requests';
import { DropdownMenuItem } from '~/components/trees/tree.type';
import { useContentNodeActions } from '~/use-cases/content-node-actions.hook';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';

export const useDropdownMenuItems = (parentId = '') => {
  const { t } = useTranslation();
  const {
    handleAddCatalog,
    handleAddTable,
    handleDeleteNode,
    handleEditNode,
    handleEditStructure,
  } = useContentNodeActions(parentId);

  const declinatedTranslations = useDeclinatedTranslationsContext();

  const menuItems = useMemo<DropdownMenuItem<ContentNodeType>[]>(
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
        label: t('ENTITY.STRUCTURE'),
        onClick: handleEditStructure,
        entityType: ContentNodeType.Table,
      },
      {
        label: t('ACTION.DELETE'),
        onClick: node => void handleDeleteNode(node),
        color: 'error',
      },
    ],
    [
      declinatedTranslations.DIRECTORY.ACCUSATIVE,
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
