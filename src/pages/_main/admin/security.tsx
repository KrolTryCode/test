import { Stack } from '@mui/material';
import { Accordion } from '@pspod/ui-components';
import { useSuspenseQuery } from '@tanstack/react-query';
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
    await queryClient.fetchQuery(getModuleListQueryOptions());
  },
});

function SecurityPage() {
  const { data: modules } = useSuspenseQuery(
    getModuleListQueryOptions({
      select: data => ({
        [ModuleType.ACCOUNTS]: selectPropertiesByModuleName(data, ModuleType.ACCOUNTS),
        [ModuleType.USERS]: selectPropertiesByModuleName(data, ModuleType.USERS),
      }),
    }),
  );

  return (
    <Stack>
      {modules[ModuleType.ACCOUNTS]?.map(entry => (
        <ConfigFormAccordion {...entry} key={entry.moduleName} />
      ))}

      {modules[ModuleType.USERS]?.map(entry => (
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
