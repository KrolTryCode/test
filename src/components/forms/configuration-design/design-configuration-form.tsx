import { yupResolver } from '@hookform/resolvers/yup';
import { FormItem, Form, FormButtons, Button } from '@pspod/ui-components';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { EntityModelModuleConfiguration, PropertyInfo } from '~/api/utils/api-requests';
import { getSchema } from '~/components/forms/configuration/configuration-form.schema';
import { useConfigurationForm } from '~/components/forms/configuration/use-configuration-form.hook';
import { LabelWithRules } from '~/components/label-with-rules/label-with-rules.component';
import { FormInputText, FormSelect } from '~/components/react-hook-form';
import { getAvailableExtensionsMsg } from '~/utils/files/validate-files';
import { useCustomTranslations } from '~/utils/hooks';

import { DesignConfigurationFormUploadLogo } from './design-configuration-form-upload-logo.component';
import { useDesignConfigurationForm } from './use-design-configuration-form.hook';

interface ConfigFormProps {
  moduleDescription: EntityModelModuleConfiguration;
}

export const DesignConfigurationForm = ({ moduleDescription }: ConfigFormProps) => {
  const { t, translateColorPalette } = useCustomTranslations();
  const { values, onSubmit, isPending, isLoading } = useConfigurationForm(moduleDescription);

  const { reset, control, register, handleSubmit, formState } = useForm({
    values,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(getSchema(moduleDescription.properties ?? [])),
  });

  const { appColorsPalettes } = useDesignConfigurationForm();

  const renderComponent = (property: PropertyInfo): ReactNode => {
    let component = <></>;
    let label: ReactNode = property.relatedData?.description;
    switch (property.type) {
      case 'int': {
        component = (
          <FormSelect
            disableClearable
            displayExpr={'title'}
            items={appColorsPalettes}
            translateItemsFunction={translateColorPalette}
            controllerProps={{ ...register(property.name!), control }}
          />
        );
        break;
      }
      case 'UUID': {
        if (property.name!.toLowerCase().includes('logo')) {
          label = <LabelWithRules label={label} content={getAvailableExtensionsMsg('image')} />;
          component = (
            <DesignConfigurationFormUploadLogo
              controllerProps={{ ...register(property.name!), control }}
              onSuccess={handleSubmit(onSubmit)}
            />
          );
        }
        break;
      }
      //String
      case undefined:
      default: {
        component = <FormInputText controllerProps={{ ...register(property.name!), control }} />;
      }
    }
    return (
      <FormItem label={label} key={property.name} isDisabled={!values}>
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
};
