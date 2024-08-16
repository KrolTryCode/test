import { FC } from 'react';

import { FallbackInfoPage } from '~/pages/fallback/fallback-info-page.component';
import { ButtonNavigate, FallbackPageType } from '~/pages/fallback/fallback.types';

export const BadReport: FC = () => {
  return (
    <FallbackInfoPage
      pageType={FallbackPageType.BadReport}
      buttonNavigate={ButtonNavigate.Back}
      showButton={false}
      showLogo={false}
    />
  );
};
