import { FC } from 'react';

import { FallbackInfoPage } from '../fallback-info-page.component';
import { ButtonNavigate, FallbackPageType } from '../fallback.type';

export const WorkInProgress: FC = () => {
  return (
    <FallbackInfoPage
      pageType={FallbackPageType.WorkInProgress}
      buttonNavigate={ButtonNavigate.ToMain}
    />
  );
};
