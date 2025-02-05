import { FC } from 'react';

import { FallbackInfoPage } from '../fallback-info-page.component';
import { FallbackPageType } from '../fallback.type';

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
