import { Stack } from '@mui/material';
import { Accordion } from '@pspod/ui-components';
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
  loader: async ({ context: { queryClient } }) => {
    const configuration = await queryClient.fetchQuery(getModuleListQueryOptions());
    return {
      accountsModuleProperties: selectPropertiesByModuleName(configuration, ModuleType.ACCOUNTS),
      usersModuleProperties: selectPropertiesByModuleName(configuration, ModuleType.USERS),
    };
  },
});

function SecurityPage() {
  const { accountsModuleProperties, usersModuleProperties } = Route.useLoaderData();

  return (
    <Stack>
      {accountsModuleProperties?.map(entry => (
        <ConfigFormAccordion {...entry} key={entry.moduleName} />
      ))}

      {usersModuleProperties?.map(entry => (
        <ConfigFormAccordion {...entry} key={entry.moduleName} />
      ))}
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
