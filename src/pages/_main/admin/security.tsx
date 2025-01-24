import { Stack } from '@mui/material';
import { Preloader } from '@pspod/ui-components';
import { createFileRoute } from '@tanstack/react-router';

import { ModuleType, useGetModulesListQuery } from '~/api/queries/settings/get-modules-list.query';
import { selectPropertiesByModuleName } from '~/api/selectors/select-properties-by-module-name';
import { DefaultConfigurationForm } from '~/components/configuration-form/default-configuration-form.component';

export const Route = createFileRoute('/_main/admin/security')({
  component: SecurityPage,
  staticData: {
    title: 'NAVIGATION.SECURITY',
    order: 4,
  },
});

function SecurityPage() {
  const { data: moduleProperties, isLoading: isAccountsModulesLoading } = useGetModulesListQuery({
    select: data => selectPropertiesByModuleName(data, ModuleType.ACCOUNTS),
  });

  const { data: usersModuleProperties, isLoading: isUsersModulesLoading } = useGetModulesListQuery({
    select: data => selectPropertiesByModuleName(data, ModuleType.USERS),
  });

  return (
    <Stack>
      {moduleProperties?.map(entry => (
        <DefaultConfigurationForm {...entry} key={entry.moduleName} />
      ))}

      {usersModuleProperties?.map(entry => (
        <DefaultConfigurationForm {...entry} key={entry.moduleName} />
      ))}

      <Preloader visible={isAccountsModulesLoading || isUsersModulesLoading} />
    </Stack>
  );
}
