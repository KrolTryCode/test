import { yupResolver } from '@hookform/resolvers/yup';
import { FormItem } from '@pspod/ui-components';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { EntityModelModuleConfiguration, PropertyInfo } from '~/api/utils/api-requests';
import { RenderConfigurationFormContent } from '~/components/configuration-form/render-configuration-form-content.component';
import { useConfigurationForm } from '~/components/configuration-form/use-configuration-form.hook';
import { FormCheckbox, FormInputNumeric, FormInputText } from '~/components/react-hook-form';

import { getSchema } from './configuration-form.schema';

export const DefaultConfigurationForm = (moduleDescription: EntityModelModuleConfiguration) => {
  const { values } = useConfigurationForm(moduleDescription);

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
    <RenderConfigurationFormContent
      reset={reset}
      formState={formState}
      handleSubmit={handleSubmit}
      renderComponent={renderComponent}
      moduleDescription={moduleDescription}
    />
  );
};
