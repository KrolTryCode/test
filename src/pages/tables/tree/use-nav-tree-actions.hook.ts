import { notifySuccess } from '@pspod/ui-components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useCreateContentNodeMutation } from '~/api/queries/nodes/create-content-node.mutation';
import { useDeleteContentNodeMutation } from '~/api/queries/nodes/delete-content-node.mutation';
import { useUpdateContentNodeMutation } from '~/api/queries/nodes/update-content-node.mutation';
import {
  ContentNodeTypeEnum,
  ContentSubtreeTypeEnum,
  CreateContentNodeRequestTypeEnum,
} from '~/api/utils/api-requests';
import { nodeModal } from '~/components/modals-content/node-modal.component';
import { NavTreeItemData, NavTreeItemType } from '~/components/nav-tree/nav-tree.type';
import { useTreeNodesUtils } from '~/pages/tables/tree/use-tree-nodes-utils.hook';
import { editPath, structurePath } from '~/utils/configuration/routes-paths';
import { showErrorMessage } from '~/utils/show-error-message';

const isContentSubtreeTypeEnum = (
  contentNodeType?: NavTreeItemType,
): contentNodeType is ContentSubtreeTypeEnum => {
  return (
    !!contentNodeType && Object.values<string>(ContentSubtreeTypeEnum).includes(contentNodeType)
  );
};

export const useNavTreeActions = (treeData: NavTreeItemData[]) => {
  const { t } = useTranslation();
  const { findNode, getParentsIdsList } = useTreeNodesUtils(treeData);
  const { projectId = '' } = useParams();
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
        nodeModal({
          title: t('ACTION.EDIT', { type: t('TREE.NODE').toLowerCase() }),
          isEditing: true,
          data: {
            name: node.label,
            // TODO Задача BE-35 https://tracker.yandex.ru/BE-35
            type: node.type as unknown as CreateContentNodeRequestTypeEnum,
            parentId: parentId,
            projectId: projectId,
          },
          onSave: data => updateNode({ nodeId: id, name: data.name, parentNodeId: data.parentId }),
        });
      }
    },
    [findNode, getParentsIdsList, projectId, t, updateNode],
  );

  const handleAddCatalog = useCallback(
    (id?: string) => {
      nodeModal({
        title: t('ACTION.ADD_CATALOG'),
        data: {
          type: ContentNodeTypeEnum.Directory as unknown as CreateContentNodeRequestTypeEnum, //todo
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
        title: t('ACTION.ADD_TABLE'),
        data: {
          type: ContentNodeTypeEnum.Table as unknown as CreateContentNodeRequestTypeEnum, //todo
          parentId: id,
          projectId: projectId,
        },
        onSave: createNode,
      });
    },
    [createNode, projectId, t],
  );

  const handleEditStructure = useCallback(
    (id?: string) => navigate(`${editPath}/${id}/${structurePath}`),
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
