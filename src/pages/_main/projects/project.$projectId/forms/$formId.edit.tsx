import { Stack, Typography } from '@mui/material';
import { notifySuccess } from '@pspod/ui-components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { getFormQueryOptions } from '~/api/queries/forms/get-form.query';
import { useUpdateFormMutation } from '~/api/queries/forms/update-form.mutation';
import { EditTaskForm } from '~/components/forms/task-form/edit-task-form';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';
import { showErrorMessage } from '~/utils/show-error-message';

export const Route = createFileRoute('/_main/projects/project/$projectId/forms/$formId/edit')({
  component: EditTaskFormPage,
  loader: async ({ context, params: { formId } }) => {
    const formData = await context.queryClient.fetchQuery(getFormQueryOptions(formId));
    context.title = formData.name;
  },
});

function EditTaskFormPage() {
  const { projectId, formId } = Route.useParams();
  const { t } = useTranslation();
  const { data: formData } = useSuspenseQuery(getFormQueryOptions(formId));

  const declinatedTranslations = useDeclinatedTranslationsContext();
  const declinatedForm = declinatedTranslations.FORM.ACCUSATIVE.toLowerCase();

  const { mutate: updateForm, isPending } = useUpdateFormMutation(projectId, formId, {
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, t('ERROR.UPDATE_FAILED')),
  });

  return (
    <Stack padding={1} gap={2} sx={{ overflowY: 'auto', height: '100%', scrollbarWidth: 'thin' }}>
      <Typography variant={'h2'} component={'h3'}>
        {t('ACTION.EDIT', { type: declinatedForm })}
      </Typography>
      <EditTaskForm
        data={formData}
        onSave={updateForm}
        isPending={isPending}
        backOptions={{ to: '/projects/project/$projectId/forms', params: { projectId } }}
      />
    </Stack>
  );
}
