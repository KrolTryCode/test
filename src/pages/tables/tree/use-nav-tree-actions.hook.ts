import { notifySuccess } from '@pspod/ui-components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useCreateContentNodeMutation } from '~/api/queries/nodes/create-content-node.mutation';
import { useDeleteContentNodeMutation } from '~/api/queries/nodes/delete-content-node.mutation';
import { useUpdateContentNodeMutation } from '~/api/queries/nodes/update-content-node.mutation';
import { ContentNodeType } from '~/api/utils/api-requests';
import { nodeModal } from '~/components/modals-content/node-modal.component';
import { NavTreeItemData, NavTreeItemType } from '~/components/nav-tree/nav-tree.type';
import { useTreeNodesUtils } from '~/pages/tables/tree/use-tree-nodes-utils.hook';
import { structurePath } from '~/utils/configuration/routes-paths';
import { useDeclinatedText } from '~/utils/hooks/use-declinated-text';
import { showErrorMessage } from '~/utils/show-error-message';

const isContentSubtreeTypeEnum = (
  contentNodeType?: NavTreeItemType,
): contentNodeType is ContentNodeType => {
  return !!contentNodeType && Object.values<string>(ContentNodeType).includes(contentNodeType);
};

export const useNavTreeActions = (treeData: NavTreeItemData[]) => {
  const { t } = useTranslation();
  const { findNode, getParentsIdsList } = useTreeNodesUtils(treeData);
  const { projectId = '' } = useParams();
  const { declinatedTableText, declinatedDirectoryText } = useDeclinatedText();
  const navigate = useNavigate();

  const { mutate: deleteNode } = useDeleteContentNodeMutation(projectId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const { mutate: createNode } = useCreateContentNodeMutation(projectId, {
    onSuccess: data => {
      notifySuccess(t('MESSAGE.CREATION_SUCCESS'));
      navigate(data.id);
    },
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutate: updateNode } = useUpdateContentNodeMutation(projectId, {
    onSuccess: data => {
      notifySuccess(t('MESSAGE.UPDATE_SUCCESS'));
      navigate(data.id);
    },
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

  const handleEditNode = useCallback(
    (id: string) => {
      const node = findNode(id);
      if (!node) {
        return;
      }
      if (isContentSubtreeTypeEnum(node.type)) {
        const parentId = getParentsIdsList(node.id).at(1);
        const declinatedType =
          node.type === ContentNodeType.Directory ? declinatedDirectoryText : declinatedTableText;
        nodeModal({
          title: t('ACTION.EDIT', { type: t(declinatedType).toLowerCase() }),
          isEditing: true,
          data: {
            name: node.label,
            type: node.type,
            parentId: parentId,
            projectId: projectId,
          },
          onSave: data => updateNode({ nodeId: id, name: data.name, parentNodeId: data.parentId }),
        });
      }
    },
    [
      declinatedDirectoryText,
      declinatedTableText,
      findNode,
      getParentsIdsList,
      projectId,
      t,
      updateNode,
    ],
  );

  const handleAddCatalog = useCallback(
    (id?: string) => {
      nodeModal({
        title: t('ACTION.ADD', { type: t('ENTITY.CATALOGUE').toLowerCase() }),
        data: {
          type: ContentNodeType.Directory,
          parentId: id,
          projectId: projectId,
        },
        onSave: createNode,
      });
    },
    [createNode, projectId, t],
  );

  const handleAddTable = useCallback(
    (id?: string) => {
      nodeModal({
        title: t('ACTION.ADD', { type: declinatedTableText.toLowerCase() }),
        data: {
          type: ContentNodeType.Table,
          parentId: id,
          projectId: projectId,
        },
        onSave: createNode,
      });
    },
    [t, declinatedTableText, projectId, createNode],
  );

  const handleEditStructure = useCallback(
    (id?: string) => navigate(`${id}/${structurePath}`),
    [navigate],
  );

  const handleDeleteNode = useCallback((id: string) => deleteNode(id), [deleteNode]);

  return {
    handleDeleteNode,
    handleAddCatalog,
    handleAddTable,
    handleEditNode,
    handleEditStructure,
  };
};
