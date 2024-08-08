import { Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useGetTemplateQuery } from '~/api/queries/templates/get-template.query';
import { TemplateForm } from '~/pages/admin/templates/template-form/template-form.component';
import { Preloader } from '~/ui-components/preloader/preloader.component';

export const EditTemplate: FC = () => {
  const { t } = useTranslation();
  const { templateId } = useParams<{ templateId: string }>();
  const { data: data, isLoading } = useGetTemplateQuery(templateId ?? '');

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <Typography variant={'h3'} component={'h2'}>
        {t('BUTTON.EDIT', { type: t('ENTITY.TEMPLATE').toLowerCase() })}
      </Typography>
      <TemplateForm data={data} />
    </>
  );
};

export default EditTemplate;
