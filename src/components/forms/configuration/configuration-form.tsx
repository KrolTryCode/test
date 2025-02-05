import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormItem, Form, FormButtons } from '@pspod/ui-components';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EntityModelModuleConfiguration, PropertyInfo } from '~/api/utils/api-requests';
import { FormCheckbox, FormInputNumeric, FormInputText } from '~/components/react-hook-form';

import { getSchema } from './configuration-form.schema';
import { useConfigurationForm } from './use-configuration-form.hook';

interface ConfigFormProps {
  moduleDescription: EntityModelModuleConfiguration;
}

export function ConfigForm({ moduleDescription }: ConfigFormProps) {
  const { t } = useTranslation();

  const { values, isLoading, isPending, onSubmit } = useConfigurationForm(moduleDescription);

  const { reset, control, register, handleSubmit, formState } = useForm({
    values,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(getSchema(moduleDescription.properties ?? [])),
  });

  const renderComponent = (property: PropertyInfo): ReactNode => {
    let component = <></>;
    switch (property.type) {
      case 'Boolean': {
        component = <FormCheckbox controllerProps={{ ...register(property.name!), control }} />;
        break;
      }
      case 'Integer': {
        component = <FormInputNumeric controllerProps={{ ...register(property.name!), control }} />;
        break;
      }
      //String
      case undefined:
      default: {
        component = <FormInputText controllerProps={{ ...register(property.name!), control }} />;
      }
    }
    return (
      <FormItem
        label={property.relatedData?.description as string}
        key={property.name}
        isDisabled={!values}
      >
        {component}
      </FormItem>
    );
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      key={moduleDescription.moduleName}
      labelPosition={'left'}
      isLoading={isLoading}
      labelWidth={3}
      showColonAfterLabel
      maxWidth={'lg'}
    >
      {moduleDescription.properties?.map(property => renderComponent(property))}
      <FormButtons>
        <Button onClick={() => reset(values)} variant={'outlined'} color={'primary'}>
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
}
