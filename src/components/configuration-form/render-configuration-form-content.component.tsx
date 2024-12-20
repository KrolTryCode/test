import { Typography } from '@mui/material';
import { Button, Form, FormButtons } from '@pspod/ui-components';
import { FC, ReactNode } from 'react';
import { FieldValues, FormState, UseFormHandleSubmit, UseFormReset } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EntityModelModuleConfiguration, PropertyInfo } from '~/api/utils/api-requests';
import { useConfigurationForm } from '~/components/configuration-form/use-configuration-form.hook';

interface RenderConfigurationFormContentProps {
  reset: UseFormReset<FieldValues>;
  formState: FormState<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  renderComponent: (property: PropertyInfo) => ReactNode;
  moduleDescription: EntityModelModuleConfiguration;
}

export const RenderConfigurationFormContent: FC<RenderConfigurationFormContentProps> = ({
  reset,
  formState,
  handleSubmit,
  renderComponent,
  moduleDescription,
}) => {
  const { t } = useTranslation();

  const { values, onSubmit, isPending } = useConfigurationForm(moduleDescription);

  const onDrop = () => reset(values);

  if (!values) {
    return null;
  }

  return (
    <>
      <Typography variant={'h4'} color={'primary'}>
        {t(`ENTITY.${moduleDescription.moduleName?.toUpperCase()}`)}
      </Typography>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        key={moduleDescription.moduleName}
        labelPosition={'left'}
        isLoading={!values}
        labelWidth={3}
      >
        {moduleDescription.properties?.map(property => renderComponent(property))}
        <FormButtons>
          <Button onClick={onDrop} variant={'outlined'} color={'primary'}>
            {t('ACTION.DROP')}
          </Button>
          <Button
            type={'submit'}
            disabled={!formState.isValid && formState.isSubmitted}
            variant={'contained'}
            color={'primary'}
            isLoading={isPending}
          >
            {t('ACTION.SAVE')}
          </Button>
        </FormButtons>
      </Form>
    </>
  );
};
