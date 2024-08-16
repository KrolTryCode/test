import { FC } from 'react';

import { FallbackInfoPage } from '~/pages/fallback/fallback-info-page.component';

import { ButtonNavigate, FallbackPageType } from '../../fallback.types';

const WorkInProgress: FC = () => {
  return (
    <FallbackInfoPage
      pageType={FallbackPageType.WorkInProgress}
      buttonNavigate={ButtonNavigate.ToMain}
    />
  );
};

export default WorkInProgress;
