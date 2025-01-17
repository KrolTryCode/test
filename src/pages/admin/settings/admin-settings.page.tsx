import { Stack } from '@mui/material';
import { Preloader } from '@pspod/ui-components';

import { ModuleType, useGetModulesListQuery } from '~/api/queries/settings/get-modules-list.query';
import { selectPropertiesByModuleName } from '~/api/selectors/select-properties-by-module-name';
import { DefaultConfigurationForm } from '~/components/configuration-form/default-configuration-form.component';
import { DesignConfigurationForm } from '~/components/configuration-form/design-configuration-form.component';

import { ExternalLinks } from './external-links.component';

const SettingsPage = () => {
  const { data: designModuleProperties, isLoading: isDesignModulesLoading } =
    useGetModulesListQuery({
      select: data => selectPropertiesByModuleName(data, ModuleType.DESIGN),
    });

  const { data: usersModuleProperties, isLoading: isUsersModulesLoading } = useGetModulesListQuery({
    select: data => selectPropertiesByModuleName(data, ModuleType.USERS),
  });

  return (
    <Stack>
      {designModuleProperties?.map(entry => (
        <DesignConfigurationForm {...entry} key={entry.moduleName} />
      ))}

      {usersModuleProperties?.map(entry => (
        <DefaultConfigurationForm {...entry} key={entry.moduleName} />
      ))}

      <ExternalLinks />

      <Preloader visible={isDesignModulesLoading || isUsersModulesLoading} />
    </Stack>
  );
};

export default SettingsPage;
