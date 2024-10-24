import { notifySuccess } from '@pspod/ui-components';
import { useTranslation } from 'react-i18next';

import { useCreateProjectNodeMutation } from '~/api/queries/projects/create-project-node.mutation';
import { useDeleteProjectNodeMutation } from '~/api/queries/projects/delete-project-node.mutation';
import { useUpdateProjectNodeMutation } from '~/api/queries/projects/update-project-node.mutation';
import { showErrorMessage } from '~/utils/show-error-message';

export function useProjectsActionsMutations() {
  const { t } = useTranslation();

  const { mutate: createProjectNode } = useCreateProjectNodeMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutate: deleteProjectNode } = useDeleteProjectNodeMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const { mutate: updateProjectNode } = useUpdateProjectNodeMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

  return {
    createProjectNode,
    deleteProjectNode,
    updateProjectNode,
  };
}
