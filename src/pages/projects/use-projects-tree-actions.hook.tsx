import { confirmDeletionModal, notifySuccess } from '@pspod/ui-components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useCreateProjectNodeMutation } from '~/api/queries/projects/create-project-node.mutation';
import { useDeleteProjectNodeMutation } from '~/api/queries/projects/delete-project-node.mutation';
import { useUpdateProjectNodeMutation } from '~/api/queries/projects/update-project-node.mutation';
import { ProjectNode, ProjectNodeType } from '~/api/utils/api-requests';
import { projectNodeModal } from '~/pages/projects/project-node/form/project-node-form.component';
import { useTablesMenuData } from '~/pages/tables/use-tables-menu-data.hook';
import { projectsPath } from '~/utils/configuration/routes-paths';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';
import { showErrorMessage } from '~/utils/show-error-message';

export const useProjectsTreeActions = () => {
  const { t } = useTranslation();
  const { projectGroupId } = useParams();

  const declinatedTranslations = useDeclinatedTranslationsContext();
  const navigate = useNavigate();

  //#region Queries & mutations
  const { treeData } = useTablesMenuData();

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

  const { mutate: createProjectNode } = useCreateProjectNodeMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  //#endregion

  //#region callbacks

  const addProject = useCallback(() => {
    projectNodeModal({
      onSave: createProjectNode,
      title: t('ACTION.CREATE', { type: t('ENTITY.PROJECT').toLowerCase() }),
      data: { type: ProjectNodeType.Project, parentId: projectGroupId },
    });
  }, [createProjectNode, projectGroupId, t]);

  const addGroup = useCallback(() => {
    const title = t('ACTION.CREATE', {
      type: declinatedTranslations.GROUP.ACCUSATIVE.toLowerCase(),
    });
    projectNodeModal({
      title,
      onSave: createProjectNode,
      data: { type: ProjectNodeType.Group, parentId: projectGroupId },
    });
  }, [t, declinatedTranslations.GROUP.ACCUSATIVE, createProjectNode, projectGroupId]);

  const importProject = useCallback(() => {
    console.log('TODO import project');
  }, []);

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
      };

      confirmDeletionModal({
        onOk,
        title: t('MESSAGE.CONFIRM_DELETE_ENTITY', { what: entity.toLowerCase() }),
      });
    },
    [declinatedTranslations, deleteProjectNode, t, treeData.length],
  );

  //#endregion

  return {
    addGroup,
    addProject,
    importProject,
    exportProject,
    moveGroupOrProject,
    updateProjectOrGroup,
    deleteProjectOrGroup,
  };
};
