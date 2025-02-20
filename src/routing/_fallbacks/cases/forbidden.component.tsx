import { FC } from 'react';

import { FallbackLayout, FallbackPageType } from '../fallback-layout.component';

export const ForbiddenPage: FC = () => {
  return <FallbackLayout pageType={FallbackPageType.Forbidden} />;
};
