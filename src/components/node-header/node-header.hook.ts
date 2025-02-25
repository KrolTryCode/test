import { confirmDeletionModal, notifySuccess } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { linkOptions, useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useDeleteProjectNodeMutation } from '~/api/queries/projects/delete-project-node.mutation';
import { projectNodeQueryOptions } from '~/api/queries/projects/get-project-node.query';
import { useUpdateProjectNodeMutation } from '~/api/queries/projects/update-project-node.mutation';
import { ProjectNode, ProjectNodeType } from '~/api/utils/api-requests';
import { projectNodeModal } from '~/components/forms/project-node/project-node-form';
import { useTablesMenuData } from '~/components/node-header/use-tables-menu-data.hook';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';
import { showErrorMessage } from '~/utils/show-error-message';

export const useNodeActions = (id: string) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: nodeData, isLoading: isNodeDataLoading } = useQuery(
    projectNodeQueryOptions(id, {
      enabled: !!id,
    }),
  );

  const { data: parentData, isLoading: isParentDataLoading } = useQuery(
    projectNodeQueryOptions(nodeData?.parentId ?? '', { enabled: !!nodeData?.parentId }),
  );

  const backPath = getBackPathOptions(parentData);

  const declinatedTranslations = useDeclinatedTranslationsContext();

  //#region Queries & mutations
  const { treeData } = useTablesMenuData();

  const { mutate: deleteProjectNode } = useDeleteProjectNodeMutation({
    onSuccess: () => {
      notifySuccess(t('MESSAGE.DELETION_SUCCESS'));
    },
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const { mutate: updateProjectNode } = useUpdateProjectNodeMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

  //#endregion

  //#region callbacks

  const exportProject = useCallback((id: string) => {
    console.log(id, 'TODO export project');
  }, []);

  const moveGroupOrProject = useCallback((id: string) => {
    console.log(id, 'TODO move project');
  }, []);

  const updateProjectOrGroup = useCallback(
    (projectNode: ProjectNode) => {
      const entity =
        declinatedTranslations[projectNode.type === ProjectNodeType.Project ? 'PROJECT' : 'GROUP']
          .ACCUSATIVE;
      const title = t('ACTION.EDIT', { type: entity.toLowerCase() });
      projectNodeModal({
        title,
        isEditing: true,
        data: { name: projectNode.name, description: projectNode.description },
        onSave: data => updateProjectNode({ nodeId: projectNode.id, ...data }),
      });
    },
    [declinatedTranslations, t, updateProjectNode],
  );

  const deleteProjectOrGroup = useCallback(
    (projectNode: ProjectNode) => {
      const hasContent = projectNode?.hasChildren ?? treeData.length !== 0;
      const type = projectNode.type;
      const entity =
        declinatedTranslations[type === ProjectNodeType.Project ? 'PROJECT' : 'GROUP'].ACCUSATIVE;

      const callAdditionalConfirmationModal = (onOk: () => void) => {
        const notEmptyNode = `MESSAGE.NOT_EMPTY_${type?.toUpperCase()}`;
        const title = `${t(notEmptyNode)} ${t('MESSAGE.CONFIRM_CONTINUE_DELETE')}`;

        confirmDeletionModal({ title, onOk });
      };

      const onDelete = () => deleteProjectNode(projectNode.id);

      const onOk = () => {
        if (hasContent) {
          callAdditionalConfirmationModal(onDelete);
        } else {
          onDelete();
        }
        void navigate(backPath);
      };

      confirmDeletionModal({
        onOk,
        title: t('MESSAGE.CONFIRM_DELETE_ENTITY', { what: entity.toLowerCase() }),
      });
    },
    [backPath, declinatedTranslations, deleteProjectNode, navigate, t, treeData.length],
  );

  //#endregion

  return {
    nodeData: { ...nodeData!, backPath },
    isNodeDataLoading: isParentDataLoading || isNodeDataLoading,
    exportProject,
    moveGroupOrProject,
    updateProjectOrGroup,
    deleteProjectOrGroup,
  };
};

function getBackPathOptions(parentData?: ProjectNode) {
  if (!parentData) {
    return linkOptions({ to: '/projects/group' });
  } else if (parentData.type === ProjectNodeType.Group) {
    return linkOptions({ to: '/projects/group/$groupId', params: { groupId: parentData.id } });
  } else if (parentData.type === ProjectNodeType.Project) {
    return linkOptions({
      to: '/projects/project/$projectId',
      params: { projectId: parentData.id },
    });
  }

  return linkOptions({ to: '/projects/group' });
}
