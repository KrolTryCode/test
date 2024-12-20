import { yupResolver } from '@hookform/resolvers/yup';
import { FormItem } from '@pspod/ui-components';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { EntityModelModuleConfiguration, PropertyInfo } from '~/api/utils/api-requests';
import { RenderConfigurationFormContent } from '~/components/configuration-form/render-configuration-form-content.component';
import { useConfigurationForm } from '~/components/configuration-form/use-configuration-form.hook';
import { useDesignConfigurationForm } from '~/components/configuration-form/use-design-configuration-form.hook';
import { FormInputFile, FormInputText } from '~/components/react-hook-form';
import { FormRadioGroup } from '~/components/react-hook-form/form-radio-group/form-radio-group.component';
import { mimeType } from '~/utils/files/upload-files';

import { getSchema } from './configuration-form.schema';

export const DesignConfigurationForm = (moduleDescription: EntityModelModuleConfiguration) => {
  const { values } = useConfigurationForm(moduleDescription);

  const { reset, control, register, resetField, setValue, handleSubmit, formState } = useForm({
    values,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(getSchema(moduleDescription.properties ?? [])),
  });

  const { onAttachLogoFile, appColorsPalettes } = useDesignConfigurationForm(resetField, setValue);

  const renderComponent = (property: PropertyInfo): ReactNode => {
    let component = <></>;
    switch (property.type) {
      case 'int': {
        component = (
          <FormRadioGroup
            items={appColorsPalettes}
            controllerProps={{ ...register(property.name!), control }}
          />
        );
        break;
      }
      case 'UUID': {
        component = (
          <FormInputFile
            showPreview
            onChangeFile={onAttachLogoFile}
            controllerProps={{ ...register(property.name!), control }}
            accept={mimeType.image}
          />
        );
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
    <RenderConfigurationFormContent
      reset={reset}
      formState={formState}
      handleSubmit={handleSubmit}
      renderComponent={renderComponent}
      moduleDescription={moduleDescription}
    />
  );
};
