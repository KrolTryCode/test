import { Typography } from '@mui/material';
import { Preloader } from '@pspod/ui-components';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useGetTemplateQuery } from '~/api/queries/templates/get-template.query';

import { TemplateForm } from './template-form/template-form.component';

export const Route = createFileRoute('/_main/admin/templates/$templateId/edit')({
  component: EditTemplate,
});

function EditTemplate() {
  const { t } = useTranslation();
  const { templateId } = Route.useParams();
  const { data: data, isLoading } = useGetTemplateQuery(templateId);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <Typography variant={'h3'} component={'h2'}>
        {t('ACTION.EDIT', { type: t('ENTITY.TEMPLATE').toLowerCase() })}
      </Typography>
      <TemplateForm data={data} />
    </>
  );
}
