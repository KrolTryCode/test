import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { Form, FormButtons, FormItem, Button, notifySuccess } from '@pspod/ui-components';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetConfigurationQuery } from '~/api/queries/settings/get-module-configuration.query';
import { useSaveConfigurationMutation } from '~/api/queries/settings/save-module-configuration.mutation';
import { EntityModelModuleConfiguration } from '~/api/utils/api-requests';
import {
  Configuration,
  PropertyInfo,
} from '~/components/configuration-form/configuration-form.type';
import { FormCheckbox, FormInputNumeric, FormInputText } from '~/components/react-hook-form';
import { showErrorMessage } from '~/utils/show-error-message';

import { getSchema } from './configuration-form.schema';

export const ConfigurationFormComponent = (moduleDescription: EntityModelModuleConfiguration) => {
  const { t } = useTranslation();

  const fetchLink = moduleDescription._links?.GET?.href;
  const saveLink = moduleDescription._links?.POST?.href;

  const { data: values } = useGetConfigurationQuery(
    moduleDescription.moduleName ?? '',
    fetchLink!,
    {
      enabled: !!fetchLink,
    },
  );

  const { mutateAsync: save, isPending } = useSaveConfigurationMutation(
    moduleDescription.moduleName ?? '',
    saveLink ?? '',
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isValid, isSubmitted },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values,
    //TODO: temporary cast because of incorrect API description
    resolver: yupResolver(getSchema(moduleDescription.properties as unknown as PropertyInfo[])),
  });

  const onSubmit = async (formValues: Configuration) => {
    await save(formValues, {
      onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
      onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
    });
  };
  const onDrop = () => {
    reset(values);
  };

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
      <FormItem label={property.relatedData?.description as string} key={property.name}>
        {component}
      </FormItem>
    );
  };

  if (!values) {
    return null;
  }

  return (
    <>
      <Typography variant={'h4'} color={'primary'} gutterBottom>
        {t(`ENTITY.${moduleDescription.moduleName?.toUpperCase()}`)}
      </Typography>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        key={moduleDescription.moduleName}
        labelPosition={'left'}
        labelWidth={8}
        isLoading={!values}
      >
        {(moduleDescription.properties ?? []).map(property => renderComponent(property))}
        <FormButtons>
          <Button onClick={onDrop}>{t('ACTION.DROP')}</Button>
          <Button
            type={'submit'}
            disabled={!isValid && isSubmitted}
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
