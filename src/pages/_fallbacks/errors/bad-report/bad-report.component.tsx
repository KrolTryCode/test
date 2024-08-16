import { FC } from 'react';

import { FallbackInfoPage } from '~/pages/_fallbacks/fallback-info-page.component';
import { ButtonNavigate, FallbackPageType } from '~/pages/_fallbacks/fallback.types';

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
