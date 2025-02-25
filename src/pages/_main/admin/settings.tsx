import { Stack } from '@mui/material';
import { Accordion } from '@pspod/ui-components';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { getExternalLinksQueryOptions } from '~/api/queries/settings/get-external-links.query';
import {
  ModuleType,
  getModuleListQueryOptions,
} from '~/api/queries/settings/get-module-list.query';
import { selectPropertiesByModuleName } from '~/api/selectors/select-properties-by-module-name';
import { DesignConfigurationForm } from '~/components/forms/configuration-design/design-configuration-form';
import { ExternalLinksTable } from '~/components/tables/external-links/external-links.component';
import { ExternalLinkWithId } from '~/components/tables/external-links/external-links.hook';

export const Route = createFileRoute('/_main/admin/settings')({
  component: SettingsPage,
  staticData: {
    title: 'NAVIGATION.SETTINGS',
    order: 3,
  },
  loader: async ({ context: { queryClient } }) => {
    const configuration = await queryClient.fetchQuery(getModuleListQueryOptions());
    const externalLinks = await queryClient.fetchQuery(
      getExternalLinksQueryOptions<ExternalLinkWithId[]>(),
    );
    return {
      designModuleProperties: selectPropertiesByModuleName(configuration, ModuleType.DESIGN),
      links: externalLinks.links.map(v => ({ ...v, id: v.order.toString() })),
    };
  },
});

function SettingsPage() {
  const { t } = useTranslation();

  const { designModuleProperties } = Route.useLoaderData();

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
