import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useCreateProjectNodeMutation } from '~/api/queries/nodes/create-project-node.mutation';
import { useDeleteNodeMutation } from '~/api/queries/nodes/delete-project-node.mutation';
import { useUpdateProjectNodeMutation } from '~/api/queries/nodes/update-project-node.mutation';
import { ContentNodeTypeEnum, CreateContentNodeRequestTypeEnum } from '~/api/utils/api-requests';
import { DEFAULT_PROJECT_ID } from '~/app/user/user.store';
import { nodeModal } from '~/components/modals-content/node-modal.component';
import { NavTreeItemData } from '~/components/nav-tree/nav-tree.type';
import { useTreeNodesUtils } from '~/pages/tables/tree/use-tree-nodes-utils.hook';
import { notifySuccess } from '~/ui-components/notifications/notifications';
import { tablesPath } from '~/utils/configuration/routes-paths';
import { showErrorMessage } from '~/utils/show-error-message';

export const useNavTreeActions = (treeData: NavTreeItemData[]) => {
  const { findNode, getParentsIdsList } = useTreeNodesUtils(treeData);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutate: deleteNode } = useDeleteNodeMutation(DEFAULT_PROJECT_ID, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const { mutate: createNode } = useCreateProjectNodeMutation(DEFAULT_PROJECT_ID, {
    onSuccess: data => {
      notifySuccess(t('MESSAGE.CREATION_SUCCESS'));
      navigate(`/${tablesPath}/${data.id}`);
    },
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutate: updateNode } = useUpdateProjectNodeMutation(DEFAULT_PROJECT_ID, {
    onSuccess: data => {
      notifySuccess(t('MESSAGE.UPDATE_SUCCESS'));
      navigate(`/${tablesPath}/${data.id}`);
    },
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

  const handleEditNode = useCallback(
    (id: string) => {
      const node = findNode(id);
      const parentId = getParentsIdsList(node?.id ?? '').at(1);
      nodeModal({
        title: t('BUTTON.EDIT', { type: t('TREE.NODE').toLowerCase() }),
        isEditing: true,
        data: {
          name: node?.label,
          type: node?.type as unknown as CreateContentNodeRequestTypeEnum, //todo
          parentId: parentId,
        },
        onSave: data => updateNode({ nodeId: id, name: data.name, parentNodeId: data.parentId }),
      });
    },
    [findNode, getParentsIdsList, t, updateNode],
  );

  const handleAddCatalog = useCallback(
    (id?: string) => {
      nodeModal({
        title: t('BUTTON.ADD_CATALOG'),
        data: {
          type: ContentNodeTypeEnum.Directory as unknown as CreateContentNodeRequestTypeEnum, //todo
          parentId: id,
        },
        onSave: createNode,
      });
    },
    [createNode, t],
  );

  const handleAddTable = useCallback(
    (id?: string) => {
      nodeModal({
        title: t('BUTTON.ADD_TABLE'),
        data: {
          type: ContentNodeTypeEnum.Table as unknown as CreateContentNodeRequestTypeEnum, //todo
          parentId: id,
        },
        onSave: createNode,
      });
    },
    [createNode, t],
  );

  const handleDeleteNode = useCallback((id: string) => deleteNode(id), [deleteNode]);

  return { handleDeleteNode, handleAddCatalog, handleAddTable, handleEditNode };
};
