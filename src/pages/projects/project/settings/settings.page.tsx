import { Accordion } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ServiceTokens } from '~/pages/projects/project/settings/token/service-tokens.component';

const Settings: FC = () => {
  const { t } = useTranslation();

  return <Accordion text={t('ENTITY.TOKENS')} content={<ServiceTokens />} />;
};

export default Settings;
