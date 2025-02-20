import { FC } from 'react';

import { FallbackLayout, FallbackPageType } from '../fallback-layout.component';

export const WorkInProgress: FC = () => {
  return <FallbackLayout pageType={FallbackPageType.WorkInProgress} />;
};
