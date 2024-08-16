import { FC } from 'react';

import { FallbackInfoPage } from '~/pages/fallback/fallback-info-page.component';
import { FallbackPageType } from '~/pages/fallback/fallback.types';

export const EmptyTable: FC = () => {
  return (
    <FallbackInfoPage pageType={FallbackPageType.EmptyTable} showButton={false} showLogo={false} />
  );
};

export const EmptyCatalog: FC = () => {
  return (
    <FallbackInfoPage
      pageType={FallbackPageType.EmptyCatalog}
      showButton={false}
      showLogo={false}
    />
  );
};
