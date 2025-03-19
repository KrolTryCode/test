import { notifySuccess } from '@pspod/ui-components';
import { useRouteContext } from '@tanstack/react-router';
import { format } from 'date-fns';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { exportProjectQueryOptions } from '~/api/queries/projects/export-project.query';
import { ProjectNode } from '~/api/utils/api-requests';
import { exportProjectModal } from '~/components/forms/export-project/export-project-form.modal';
import { downloadBlobFile } from '~/utils/files';
import { showErrorMessage } from '~/utils/show-error-message';

export const useExportProject = (projectData: ProjectNode) => {
  const { t } = useTranslation();
  const { queryClient } = useRouteContext({ strict: false });

  const onExport = useCallback(
    async (types: string[]) => {
      try {
        const file = await queryClient?.fetchQuery(
          exportProjectQueryOptions(projectData.id, types),
        );

        if (file) {
          downloadBlobFile(
            file,
            projectData.name + format(new Date(), '_dd.MM.yyyy_HH.mm.ss') + '.zip',
          );
        }

        notifySuccess(t('MESSAGE.DOWNLOAD_SUCCESS'));
      } catch (e) {
        showErrorMessage(e, 'FILES.UPLOAD_FAILED');
      }
    },
    [projectData.id, projectData.name, queryClient, t],
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
