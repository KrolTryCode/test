import { notifySuccess } from '@pspod/ui-components';
import { useParams } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateProjectNodeMutation } from '~/api/queries/projects/create-project-node.mutation';
import { useUploadProjectFileMutation } from '~/api/queries/projects/import-project.mutation';
import { ProjectNodeType } from '~/api/utils/api-requests';
import { projectNodeModal } from '~/components/forms/project-node/project-node-form';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';
import { validateSelectedFiles } from '~/utils/files';
import { showErrorMessage } from '~/utils/show-error-message';

export const useCreateNodeActions = () => {
  const { t } = useTranslation();
  const { projectId, groupId } = useParams({ strict: false });

  const { mutate: uploadProject, isPending: isUploadingProject } = useUploadProjectFileMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.IMPORT_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.IMPORT_FAILED'),
  });

  const declinatedTranslations = useDeclinatedTranslationsContext();

  const { mutate: createProjectNode } = useCreateProjectNodeMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const addProject = useCallback(() => {
    projectNodeModal({
      onSave: createProjectNode,
      title: t('ACTION.CREATE', { type: t('ENTITY.PROJECT').toLowerCase() }),
      data: { type: ProjectNodeType.Project, parentId: groupId ?? projectId },
    });
  }, [createProjectNode, groupId, projectId, t]);

  const addGroup = useCallback(() => {
    const title = t('ACTION.CREATE', {
      type: declinatedTranslations.GROUP.ACCUSATIVE.toLowerCase(),
    });
    projectNodeModal({
      title,
      onSave: createProjectNode,
      data: { type: ProjectNodeType.Group, parentId: groupId ?? projectId },
    });
  }, [t, declinatedTranslations.GROUP.ACCUSATIVE, createProjectNode, groupId, projectId]);

  const importProject = useCallback(
    (files: File[]) => {
      const isValid = !!validateSelectedFiles(files, 'zip').length;
      if (isValid) {
        uploadProject(files[0]);
      }
    },
    [uploadProject],
  );

  return {
    addGroup,
    addProject,
    importProject,
    isUploadingProject,
  };
};
