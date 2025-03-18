import { notifySuccess, confirmActionModal, confirmDeletionModal } from '@pspod/ui-components';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateProjectContentMutation } from '~/api/queries/project-content/create-project-content.mutation';
import { useDeleteProjectContentMutation } from '~/api/queries/project-content/delete-project-content.mutation';
import { useUpdateProjectContentMutation } from '~/api/queries/project-content/update-project-content.mutation';
import { useGetTableMetadataColumns } from '~/api/queries/tables/structure/get-table-metadata.mutation';
import { ContentNode, ContentNodeType } from '~/api/utils/api-requests';
import { nodeModal } from '~/components/forms/table-node/table-node-form.modal';
import { isFolderType } from '~/components/trees/tree.utils';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';
import { showErrorMessage } from '~/utils/show-error-message';

export function useContentNodeActions(parentId = '') {
  const { t } = useTranslation();
  const { projectId = '' } = useParams({ strict: false });
  const declinatedTranslations = useDeclinatedTranslationsContext();
  const navigate = useNavigate();

  const { mutate: deleteNode } = useDeleteProjectContentMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const { mutate: createNode } = useCreateProjectContentMutation(projectId, {
    onSuccess: data => {
      notifySuccess(t('MESSAGE.CREATION_SUCCESS'));
      if (isFolderType(data.type)) {
        void navigate({
          to: `/projects/project/$projectId/tables/folders/$folderId`,
          params: { folderId: data.id, projectId },
        });
      } else {
        void navigate({
          to: '/projects/project/$projectId/tables/$tableId/structure',
          params: { tableId: data.id, projectId },
        });
      }
    },
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutate: updateNode } = useUpdateProjectContentMutation({
    onSuccess: data => {
      notifySuccess(t('MESSAGE.UPDATE_SUCCESS'));
      if (isFolderType(data.type)) {
        void navigate({
          to: `/projects/project/$projectId/tables/folders/$folderId`,
          params: { folderId: data.id, projectId },
        });
      } else {
        void navigate({
          to: '/projects/project/$projectId/tables/$tableId',
          params: { tableId: data.id, projectId },
        });
      }
    },
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

  const { mutateAsync: getTableMetadata } = useGetTableMetadataColumns({
    onError: e => showErrorMessage(e, 'ERROR.RETRIEVE_FAILED'),
  });

  const handleEditNode = useCallback(
    (node: ContentNode) => {
      const entity =
        declinatedTranslations[isFolderType(node.type) ? 'DIRECTORY' : 'TABLE'].ACCUSATIVE;
      const title = t('ACTION.EDIT', { type: entity.toLowerCase() });
      nodeModal({
        title,
        isEditing: true,
        projectId: projectId,
        currentNodeId: parentId,
        data: {
          name: node.name,
          type: node.type,
        },
        onSave: data => updateNode({ nodeId: node.id, name: data.name }),
      });
    },
    [declinatedTranslations, parentId, projectId, t, updateNode],
  );

  const handleAddCatalog = useCallback(
    (node?: ContentNode) => {
      nodeModal({
        title: t('ACTION.ADD', { type: declinatedTranslations.DIRECTORY.ACCUSATIVE.toLowerCase() }),
        onSave: createNode,
        projectId: projectId,
        currentNodeId: node?.id,
        data: {
          type: ContentNodeType.Directory,
          parentContentNodeId: node?.id,
        },
      });
    },
    [createNode, declinatedTranslations.DIRECTORY.ACCUSATIVE, projectId, t],
  );

  const handleAddTable = useCallback(
    (node?: ContentNode) => {
      nodeModal({
        title: t('ACTION.ADD', { type: declinatedTranslations.TABLE.ACCUSATIVE.toLowerCase() }),
        onSave: createNode,
        projectId: projectId,
        currentNodeId: node?.id,
        data: {
          type: ContentNodeType.Table,
          parentContentNodeId: node?.id,
        },
      });
    },
    [createNode, declinatedTranslations.TABLE.ACCUSATIVE, projectId, t],
  );

  const handleEditStructure = useCallback(
    (node: ContentNode) =>
      void navigate({
        to: '/projects/project/$projectId/tables/$tableId/structure',
        params: { tableId: node.id, projectId },
      }),
    [navigate, projectId],
  );

  const handleDeleteNode = useCallback(
    async (node: ContentNode) => {
      let hasChildren = node?.hasChildren;

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

      const onDelete = () => deleteNode(node.id);

      const onOk = () => {
        if (hasChildren) {
          callAdditionalConfirmationModal(onDelete);
        } else {
          onDelete();
        }
      };

      const entity =
        declinatedTranslations[isFolderType(node.type) ? 'DIRECTORY' : 'TABLE'].ACCUSATIVE;
      const title = t('MESSAGE.CONFIRM_DELETE_ENTITY', { what: entity.toLowerCase() });
      return confirmActionModal({ title, onOk });
    },
    [declinatedTranslations, deleteNode, getTableMetadata, t],
  );

  return {
    handleDeleteNode,
    handleAddCatalog,
    handleAddTable,
    handleEditNode,
    handleEditStructure,
  };
}
