import { confirmDeletionModal, notifySuccess } from '@pspod/ui-components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useDeleteProjectNodeMutation } from '~/api/queries/projects/delete-project-node.mutation';
import { useUpdateProjectNodeMutation } from '~/api/queries/projects/update-project-node.mutation';
import { ProjectNode, ProjectNodeType } from '~/api/utils/api-requests';
import { NavTreeItemType } from '~/components/nav-tree/nav-tree.type';
import { projectNodeModal } from '~/pages/projects/project-node/form/project-node-form.component';
import { useTablesMenuData } from '~/pages/tables/use-tables-menu-data.hook';
import { projectsPath } from '~/utils/configuration/routes-paths';
import { useDeclinatedText } from '~/utils/hooks/use-declinated-text';
import { showErrorMessage } from '~/utils/show-error-message';

const isProjectSubtreeTypeEnum = (
  projectNodeType?: NavTreeItemType,
): projectNodeType is ProjectNodeType => {
  return !!projectNodeType && Object.values<string>(ProjectNodeType).includes(projectNodeType);
};

export function useProjectHeaderActions(projectNode?: ProjectNode) {
  const { t } = useTranslation();
  const { treeData } = useTablesMenuData();
  const { declinatedGroupText } = useDeclinatedText();
  const navigate = useNavigate();

  const { mutate: deleteProjectNode } = useDeleteProjectNodeMutation({
    onSuccess: () => {
      navigate(`/${projectsPath}`);
      notifySuccess(t('MESSAGE.DELETION_SUCCESS'));
    },
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const { mutate: updateProjectNode } = useUpdateProjectNodeMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

  const onUpdateProjectNode = useCallback(() => {
    if (isProjectSubtreeTypeEnum(projectNode?.type)) {
      const declinatedProjectNode =
        projectNode.type === ProjectNodeType.Project ? t('ENTITY.PROJECT') : declinatedGroupText;
      const title = t('ACTION.EDIT', { type: declinatedProjectNode.toLowerCase() });

      projectNodeModal({
        isEditing: true,
        title,
        data: { name: projectNode.name, description: projectNode.description },
        onSave: data => updateProjectNode({ nodeId: projectNode.id, ...data }),
      });
    }
  }, [
    t,
    declinatedGroupText,
    updateProjectNode,
    projectNode?.id,
    projectNode?.type,
    projectNode?.name,
    projectNode?.description,
  ]);

  const onDeleteProjectNode = useCallback(() => {
    const hasContent = projectNode?.hasChildren ?? treeData.length !== 0;
    const type = projectNode?.type;
    const declinatedProjectNode =
      type === ProjectNodeType.Project ? t('ENTITY.PROJECT') : declinatedGroupText;

    const callAdditionalConfirmationModal = (onOk: () => void) => {
      const notEmptyNode = `MESSAGE.NOT_EMPTY_${type?.toUpperCase()}`;
      const title = `${t(notEmptyNode)} ${t('MESSAGE.CONFIRM_CONTINUE_DELETE')}`;

      confirmDeletionModal({ title, onOk });
    };

    const onDelete = () => deleteProjectNode(projectNode?.id ?? '');

    const onOk = () => {
      if (hasContent) {
        callAdditionalConfirmationModal(onDelete);
      } else {
        onDelete();
      }
    };

    confirmDeletionModal({
      onOk,
      title: t('MESSAGE.CONFIRM_DELETE_ENTITY', { what: declinatedProjectNode.toLowerCase() }),
    });
  }, [
    projectNode?.hasChildren,
    projectNode?.type,
    projectNode?.id,
    treeData.length,
    declinatedGroupText,
    deleteProjectNode,
    t,
  ]);

  return { onUpdateProjectNode, onDeleteProjectNode };
}
