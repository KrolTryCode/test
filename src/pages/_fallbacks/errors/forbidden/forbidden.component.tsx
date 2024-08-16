import { FC } from 'react';

import { FallbackInfoPage } from '~/pages/_fallbacks/fallback-info-page.component';
import { ButtonNavigate, FallbackPageType } from '~/pages/_fallbacks/fallback.types';

export const ForbiddenPage: FC = () => {
  return (
    <FallbackInfoPage
      pageType={FallbackPageType.Forbidden}
      buttonNavigate={ButtonNavigate.ToMain}
    />
  );
};
