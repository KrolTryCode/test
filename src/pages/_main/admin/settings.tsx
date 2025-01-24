import { Stack } from '@mui/material';
import { Preloader } from '@pspod/ui-components';
import { createFileRoute } from '@tanstack/react-router';

import { ModuleType, useGetModulesListQuery } from '~/api/queries/settings/get-modules-list.query';
import { selectPropertiesByModuleName } from '~/api/selectors/select-properties-by-module-name';
import { DesignConfigurationForm } from '~/components/configuration-form/design-configuration-form.component';

import { ExternalLinks } from './_settings/external-links.component';

export const Route = createFileRoute('/_main/admin/settings')({
  component: SettingsPage,
  staticData: {
    title: 'NAVIGATION.SETTINGS',
    order: 3,
  },
});

function SettingsPage() {
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
}
