import { Stack, Typography } from '@mui/material';
import { notifySuccess } from '@pspod/ui-components';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useAddFormMutation } from '~/api/queries/forms/add-form.mutation';
import { AddTaskForm } from '~/components/forms/task-form/add-task-form';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';
import { showErrorMessage } from '~/utils/show-error-message';

export const Route = createFileRoute('/_main/projects/project/$projectId/forms/add')({
  component: AddTaskFormPage,
});

function AddTaskFormPage() {
  const { projectId } = Route.useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutateAsync: addForm, isPending } = useAddFormMutation(projectId, {
    onSuccess: () => {
      notifySuccess(t('MESSAGE.CREATION_SUCCESS'));
      void navigate({
        to: '/projects/project/$projectId/forms',
        params: { projectId },
      });
    },
    onError: e => {
      showErrorMessage(e, t('ERROR.CREATION_FAILED'));
    },
  });

  const declinatedTranslations = useDeclinatedTranslationsContext();
  const declinatedForm = declinatedTranslations.FORM.ACCUSATIVE.toLowerCase();

  return (
    <Stack padding={1} gap={2} sx={{ overflowY: 'auto', height: '100%', scrollbarWidth: 'thin' }}>
      <Typography variant={'h2'} component={'h3'}>
        {t('ACTION.ADD', { type: declinatedForm })}
      </Typography>
      <AddTaskForm onSave={addForm} isPending={isPending} />
    </Stack>
  );
}
