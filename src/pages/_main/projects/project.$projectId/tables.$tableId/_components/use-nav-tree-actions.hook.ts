import { notifySuccess, confirmActionModal, confirmDeletionModal } from '@pspod/ui-components';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateProjectContentMutation } from '~/api/queries/project-content/create-project-content.mutation';
import { useDeleteProjectContentMutation } from '~/api/queries/project-content/delete-project-content.mutation';
import { useUpdateProjectContentMutation } from '~/api/queries/project-content/update-project-content.mutation';
import { useGetTableMetadataColumns } from '~/api/queries/tables/structure/get-table-metadata.mutation';
import { ContentNodeType } from '~/api/utils/api-requests';
import { nodeModal } from '~/components/modals-content/node-modal.component';
import { NavTreeItemData, NavTreeItemType } from '~/components/nav-tree/nav-tree.type';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';
import { useTreeNodesUtils } from '~/utils/hooks/use-tree-nodes';
import { showErrorMessage } from '~/utils/show-error-message';

const isContentSubtreeTypeEnum = (
  contentNodeType?: NavTreeItemType,
): contentNodeType is ContentNodeType => {
  return !!contentNodeType && Object.values<string>(ContentNodeType).includes(contentNodeType);
};

export const useNavTreeActions = (treeData: NavTreeItemData[]) => {
  const { t } = useTranslation();
  const { findNode, getParentsIdsList } = useTreeNodesUtils(treeData);
  const { projectId = '' } = useParams({ strict: false });
  const declinatedTranslations = useDeclinatedTranslationsContext();
  const navigate = useNavigate();

  const { mutate: deleteNode } = useDeleteProjectContentMutation(projectId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const { mutate: createNode } = useCreateProjectContentMutation(projectId, {
    onSuccess: data => {
      notifySuccess(t('MESSAGE.CREATION_SUCCESS'));
      void navigate({
        to: '/projects/project/$projectId/tables/$tableId',
        params: { tableId: data.id, projectId },
      });
    },
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutate: updateNode } = useUpdateProjectContentMutation(projectId, {
    onSuccess: data => {
      notifySuccess(t('MESSAGE.UPDATE_SUCCESS'));
      void navigate({
        to: '/projects/project/$projectId/tables/$tableId',
        params: { tableId: data.id, projectId },
      });
    },
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

  const { mutateAsync: getTableMetadata } = useGetTableMetadataColumns({
    onError: e => showErrorMessage(e, 'ERROR.RETRIEVE_FAILED'),
  });

  const handleEditNode = useCallback(
    (id: string) => {
      const node = findNode(id);
      if (!node) {
        return;
      }
      if (isContentSubtreeTypeEnum(node.type)) {
        const parentContentNodeId = getParentsIdsList(node.id).at(1);
        const entity =
          declinatedTranslations[node.type === ContentNodeType.Directory ? 'DIRECTORY' : 'TABLE']
            .ACCUSATIVE;
        const title = t('ACTION.EDIT', { type: entity.toLowerCase() });
        nodeModal({
          title,
          isEditing: true,
          data: {
            name: node.label,
            type: node.type,
            parentContentNodeId,
          },
          onSave: data => updateNode({ nodeId: id, name: data.name }),
        });
      }
    },
    [declinatedTranslations, findNode, getParentsIdsList, t, updateNode],
  );

  const handleAddCatalog = useCallback(
    (id?: string) => {
      nodeModal({
        title: t('ACTION.ADD', { type: declinatedTranslations.DIRECTORY.ACCUSATIVE.toLowerCase() }),
        data: {
          type: ContentNodeType.Directory,
          parentContentNodeId: id,
        },
        onSave: createNode,
        projectId: projectId,
      });
    },
    [createNode, declinatedTranslations.DIRECTORY.ACCUSATIVE, projectId, t],
  );

  const handleAddTable = useCallback(
    (id?: string) => {
      const entity = declinatedTranslations.TABLE.ACCUSATIVE;
      const title = t('ACTION.ADD', { type: entity.toLowerCase() });
      nodeModal({
        title,
        data: {
          type: ContentNodeType.Table,
          parentContentNodeId: id,
        },
        onSave: createNode,
        projectId: projectId,
      });
    },
    [declinatedTranslations.TABLE.ACCUSATIVE, t, projectId, createNode],
  );

  const handleEditStructure = useCallback(
    (id?: string) =>
      void navigate({
        to: '/projects/project/$projectId/tables/$tableId/structure',
        params: { tableId: id!, projectId },
      }),
    [navigate, projectId],
  );

  const handleDeleteNode = useCallback(
    async (id: string) => {
      const node = findNode(id);
      let hasChildren = node?.children && node.children?.length > 0;

      const callAdditionalConfirmationModal = (onOk: () => void) => {
        const notEmptyNode = `MESSAGE.NOT_EMPTY_${node?.type?.toUpperCase()}`;
        const title = `${t(notEmptyNode)} ${t('MESSAGE.CONFIRM_CONTINUE_DELETE')}`;
        confirmDeletionModal({ title, onOk });
      };

      if (node?.type === ContentNodeType.Table) {
        const table = await getTableMetadata(node.id);
        if (table?.columns && table?.columns?.length > 0) {
          hasChildren = true;
        }
      }

      const onDelete = () => deleteNode(id);

      const onOk = () => {
        if (hasChildren) {
          callAdditionalConfirmationModal(onDelete);
        } else {
          onDelete();
        }
      };

      const entity =
        declinatedTranslations[node?.type === ContentNodeType.Directory ? 'DIRECTORY' : 'TABLE']
          .ACCUSATIVE;
      const title = t('MESSAGE.CONFIRM_DELETE_ENTITY', { what: entity.toLowerCase() });
      return confirmActionModal({ title, onOk });
    },
    [declinatedTranslations, deleteNode, findNode, getTableMetadata, t],
  );

  return {
    handleDeleteNode,
    handleAddCatalog,
    handleAddTable,
    handleEditNode,
    handleEditStructure,
  };
};
