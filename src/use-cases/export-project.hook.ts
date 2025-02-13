import { notifySuccess } from '@pspod/ui-components';
import { format } from 'date-fns';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useExportProjectMutation } from '~/api/queries/projects/export-project.mutation';
import { ProjectNode } from '~/api/utils/api-requests';
import { exportProjectModal } from '~/components/forms/export-project/export-project-form.modal';
import { downloadBlobFile } from '~/utils/files';
import { showErrorMessage } from '~/utils/show-error-message';

export const useExportProject = (projectData: ProjectNode) => {
  const { t } = useTranslation();

  const { mutateAsync: exportProjectMutation } = useExportProjectMutation(projectData.id, {
    onSuccess: () => notifySuccess(t('MESSAGE.DOWNLOAD_SUCCESS')),
    onError: e => showErrorMessage(e, 'FILES.UPLOAD_FAILED'),
  });

  const onExport = useCallback(
    async (types: string[]) => {
      const file = await exportProjectMutation(types);

      if (file) {
        downloadBlobFile(
          file,
          projectData.name + format(new Date(), '_dd.MM.yyyy_HH.mm.ss') + '.zip',
        );
      }
    },
    [exportProjectMutation, projectData.name],
  );

  const exportProject = useCallback(() => {
    exportProjectModal({
      projectId: projectData.id,
      title: t('ACTION.EXPORT', { what: t('ENTITY.PROJECT').toLowerCase() }),
      onExport,
    });
  }, [projectData.id, t, onExport]);

  return {
    exportProject,
  };
};
