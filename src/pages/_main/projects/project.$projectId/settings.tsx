import { Accordion } from '@pspod/ui-components';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ServiceTokens } from './settings/token/service-tokens.component';

export const Route = createFileRoute('/_main/projects/project/$projectId/settings')({
  component: Settings,
  staticData: {
    title: 'NAVIGATION.SETTINGS',
    order: 6,
  },
});

function Settings() {
  const { t } = useTranslation();

  return <Accordion text={t('ENTITY.TOKENS')} content={<ServiceTokens />} />;
}
