import { Stack, Typography } from '@mui/material';
import { notifySuccess } from '@pspod/ui-components';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useGetFormQuery } from '~/api/tasks/forms/get-form.query';
import { useUpdateFormMutation } from '~/api/tasks/forms/update-form.mutation';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';
import { showErrorMessage } from '~/utils/show-error-message';

import { TaskForm } from './task-form.component';

export const Route = createFileRoute('/_main/projects/project/$projectId/forms/$formId/edit')({
  component: EditTaskFormPage,
});

function EditTaskFormPage() {
  const { projectId, formId } = Route.useParams();
  const { t } = useTranslation();
  const declinatedTranslations = useDeclinatedTranslationsContext();
  const declinatedForm = declinatedTranslations.FORM.ACCUSATIVE.toLowerCase();

  const { data } = useGetFormQuery(formId);
  const { mutate: updateForm } = useUpdateFormMutation(projectId, {
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, t('ERROR.UPDATE_FAILED')),
  });

  return (
    <Stack padding={1} gap={2} sx={{ overflowY: 'auto', height: '100%', scrollbarWidth: 'thin' }}>
      <Typography variant={'h2'} component={'h3'}>
        {t('ACTION.EDIT', { type: declinatedForm })}
      </Typography>
      <TaskForm data={data} onSave={updateForm} backPath={Route.parentRoute.fullPath} />
    </Stack>
  );
}
