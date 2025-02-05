import { Stack } from '@mui/material';
import { Accordion, Preloader } from '@pspod/ui-components';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ModuleType, useGetModulesListQuery } from '~/api/queries/settings/get-modules-list.query';
import { selectPropertiesByModuleName } from '~/api/selectors/select-properties-by-module-name';
import { EntityModelModuleConfiguration } from '~/api/utils/api-requests';
import { DesignConfigurationForm } from '~/components/forms/configuration-design/design-configuration-form';

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
        <ConfigFormAccordion {...entry} key={entry.moduleName} />
      ))}

      <ExternalLinks />

      <Preloader visible={isDesignModulesLoading} />
    </Stack>
  );
}

function ConfigFormAccordion(moduleDescription: EntityModelModuleConfiguration) {
  const { t } = useTranslation();

  return (
    <Accordion
      text={t(`ENTITY.${moduleDescription.moduleName?.toUpperCase()}`)}
      content={<DesignConfigurationForm moduleDescription={moduleDescription} />}
    />
  );
}
