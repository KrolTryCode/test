import { Stack, Typography } from '@mui/material';
import { notifySuccess } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { getTemplateQueryOptions } from '~/api/queries/templates/get-template.query';
import { useUpdateTemplateMutation } from '~/api/queries/templates/update-template.mutation';
import { CreateTemplateRequest } from '~/api/utils/api-requests';
import { TemplateForm } from '~/components/forms/template/template-form';
import { showErrorMessage } from '~/utils/show-error-message';

export const Route = createFileRoute('/_main/admin/templates/$templateId/edit')({
  component: EditTemplate,
});

function EditTemplate() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { templateId } = Route.useParams();

  const { data, isLoading } = useQuery(getTemplateQueryOptions(templateId));
  const { mutateAsync: updateTemplate, isPending } = useUpdateTemplateMutation({
    onSuccess: () => {
      notifySuccess(t('MESSAGE.UPDATE_SUCCESS'));
      void navigate({ to: '/admin/templates' });
    },
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

  const onSubmit = async (template: CreateTemplateRequest) =>
    updateTemplate({
      templateId,
      content: template.content,
    });

  return (
    <Stack height={'100%'}>
      <Typography variant={'h3'} component={'h2'}>
        {t('ACTION.EDIT', { type: t('ENTITY.TEMPLATE').toLowerCase() })}
      </Typography>
      <TemplateForm
        isLoading={isLoading}
        data={data as CreateTemplateRequest}
        onSave={onSubmit}
        isPending={isPending}
      />
    </Stack>
  );
}
