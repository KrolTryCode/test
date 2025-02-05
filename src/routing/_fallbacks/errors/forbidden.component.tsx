import { FC } from 'react';

import { FallbackInfoPage } from '../fallback-info-page.component';
import { ButtonNavigate, FallbackPageType } from '../fallback.type';

export const ForbiddenPage: FC = () => {
  return (
    <FallbackInfoPage
      pageType={FallbackPageType.Forbidden}
      buttonNavigate={ButtonNavigate.ToMain}
    />
  );
};
