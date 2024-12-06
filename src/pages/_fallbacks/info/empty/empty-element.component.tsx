import { FC } from 'react';

import { FallbackInfoPage } from '~/pages/_fallbacks/fallback-info-page.component';
import { FallbackPageType } from '~/pages/_fallbacks/fallback.types';

export const EmptyTable: FC = () => {
  return (
    <FallbackInfoPage pageType={FallbackPageType.EmptyTable} showButton={false} showLogo={false} />
  );
};

export const EmptyDirectory: FC = () => {
  return (
    <FallbackInfoPage
      pageType={FallbackPageType.EmptyDirectory}
      showButton={false}
      showLogo={false}
    />
  );
};
