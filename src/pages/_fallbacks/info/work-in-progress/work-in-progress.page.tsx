import { FC } from 'react';

import { FallbackInfoPage } from '~/pages/_fallbacks/fallback-info-page.component';
import { ButtonNavigate, FallbackPageType } from '~/pages/_fallbacks/fallback.types';

const WorkInProgress: FC = () => {
  return (
    <FallbackInfoPage
      pageType={FallbackPageType.WorkInProgress}
      buttonNavigate={ButtonNavigate.ToMain}
    />
  );
};

export default WorkInProgress;
