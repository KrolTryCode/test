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
import { DesignConfigurationForm } from '~/components/forms/configuration-design/design-configuration-form';
import { ExternalLinksTable } from '~/components/tables/external-links/external-links.component';

export const Route = createFileRoute('/_main/admin/settings')({
  component: SettingsPage,
  staticData: {
    title: 'NAVIGATION.SETTINGS',
    order: 3,
  },
  loader: async ({ context: { queryClient } }) => {
    await queryClient.fetchQuery(getModuleListQueryOptions());
  },
});

function SettingsPage() {
  const { t } = useTranslation();

  const { data: designModuleProperties } = useSuspenseQuery(
    getModuleListQueryOptions({
      select: data => selectPropertiesByModuleName(data, ModuleType.DESIGN),
    }),
  );

  return (
    <Stack>
      {designModuleProperties?.map(entry => (
        <Accordion
          key={entry.moduleName}
          text={t(`ENTITY.${entry.moduleName?.toUpperCase()}`)}
          content={<DesignConfigurationForm moduleDescription={entry} />}
        />
      ))}

      <Accordion
        text={t('ENTITY.EXTERNAL_SERVICES')}
        content={
          <Stack minHeight={'200px'}>
            <ExternalLinksTable />
          </Stack>
        }
      />
    </Stack>
  );
}
