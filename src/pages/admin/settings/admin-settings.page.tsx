import { Stack } from '@mui/material';
import { Preloader } from '@pspod/ui-components';

import { ModuleType, useGetModulesListQuery } from '~/api/queries/settings/get-modules-list.query';
import { selectPropertiesByModuleName } from '~/api/selectors/select-properties-by-module-name';
import { DesignConfigurationForm } from '~/components/configuration-form/design-configuration-form.component';

import { ExternalLinks } from './external-links.component';

const SettingsPage = () => {
  const { data: designModuleProperties, isLoading: isDesignModulesLoading } =
    useGetModulesListQuery({
      select: data => selectPropertiesByModuleName(data, ModuleType.DESIGN),
    });

  return (
    <Stack>
      {designModuleProperties?.map(entry => (
        <DesignConfigurationForm {...entry} key={entry.moduleName} />
      ))}

      <ExternalLinks />

      <Preloader visible={isDesignModulesLoading} />
    </Stack>
  );
};

export default SettingsPage;
