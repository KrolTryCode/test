import { yupResolver } from '@hookform/resolvers/yup';
import { FormItem, Accordion } from '@pspod/ui-components';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EntityModelModuleConfiguration, PropertyInfo } from '~/api/utils/api-requests';
import { DesignConfigurationFormUploadLogo } from '~/components/configuration-form/design-configuration-form-upload-logo.component';
import { RenderConfigurationFormContent } from '~/components/configuration-form/render-configuration-form-content.component';
import { useConfigurationForm } from '~/components/configuration-form/use-configuration-form.hook';
import { useDesignConfigurationForm } from '~/components/configuration-form/use-design-configuration-form.hook';
import { LabelWithRules } from '~/components/label-with-rules/label-with-rules.component';
import { FormInputText, FormSelect } from '~/components/react-hook-form';
import { getAvailableExtensionsMsg } from '~/utils/files/validate-files';

import { getSchema } from './configuration-form.schema';

export const DesignConfigurationForm = (moduleDescription: EntityModelModuleConfiguration) => {
  const { t } = useTranslation();
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
            items={appColorsPalettes}
            disableClearable
            displayExpr={'title'}
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
    <Accordion
      text={t(`ENTITY.${moduleDescription.moduleName?.toUpperCase()}`)}
      content={
        <RenderConfigurationFormContent
          onDrop={() => reset(values)}
          isLoading={isLoading}
          isPending={isPending}
          formState={formState}
          onSubmit={handleSubmit(onSubmit)}
          renderComponent={renderComponent}
          moduleDescription={moduleDescription}
        />
      }
    />
  );
};
