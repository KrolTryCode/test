import { Stack } from '@mui/material';
import { Accordion, Preloader } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import {
  ModuleType,
  getModuleListQueryOptions,
} from '~/api/queries/settings/get-module-list.query';
import { selectPropertiesByModuleName } from '~/api/selectors/select-properties-by-module-name';
import { EntityModelModuleConfiguration } from '~/api/utils/api-requests';
import { ConfigForm } from '~/components/forms/configuration/configuration-form';

export const Route = createFileRoute('/_main/admin/security')({
  component: SecurityPage,
  staticData: {
    title: 'NAVIGATION.SECURITY',
    order: 4,
  },
});

function SecurityPage() {
  const { data: moduleProperties, isLoading: isAccountsModulesLoading } = useQuery(
    getModuleListQueryOptions({
      select: data => selectPropertiesByModuleName(data, ModuleType.ACCOUNTS),
    }),
  );

  const { data: usersModuleProperties, isLoading: isUsersModulesLoading } = useQuery(
    getModuleListQueryOptions({
      select: data => selectPropertiesByModuleName(data, ModuleType.USERS),
    }),
  );

  return (
    <Stack>
      {moduleProperties?.map(entry => <ConfigFormAccordion {...entry} key={entry.moduleName} />)}

      {usersModuleProperties?.map(entry => (
        <ConfigFormAccordion {...entry} key={entry.moduleName} />
      ))}

      <Preloader visible={isAccountsModulesLoading || isUsersModulesLoading} />
    </Stack>
  );
}

function ConfigFormAccordion(moduleDescription: EntityModelModuleConfiguration) {
  const { t } = useTranslation();

  return (
    <Accordion
      text={t(`ENTITY.${moduleDescription.moduleName?.toUpperCase()}`)}
      content={<ConfigForm moduleDescription={moduleDescription} />}
    />
  );
}
