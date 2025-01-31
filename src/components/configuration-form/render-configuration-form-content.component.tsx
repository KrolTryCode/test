import { Button, Form, FormButtons } from '@pspod/ui-components';
import { FC, ReactNode } from 'react';
import { FieldValues, FormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EntityModelModuleConfiguration, PropertyInfo } from '~/api/utils/api-requests';

interface RenderConfigurationFormContentProps {
  formState: FormState<FieldValues>;
  renderComponent: (property: PropertyInfo) => ReactNode;
  moduleDescription: EntityModelModuleConfiguration;
  onDrop: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
  isPending?: boolean;
}

export const RenderConfigurationFormContent: FC<RenderConfigurationFormContentProps> = ({
  formState,
  isLoading,
  isPending,
  onDrop,
  onSubmit,
  renderComponent,
  moduleDescription,
}) => {
  const { t } = useTranslation();

  return (
    <Form
      onSubmit={onSubmit}
      key={moduleDescription.moduleName}
      labelPosition={'left'}
      isLoading={isLoading}
      labelWidth={3}
      showColonAfterLabel
      maxWidth={'lg'}
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
  );
};
