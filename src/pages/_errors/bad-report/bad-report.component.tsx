import { FC } from 'react';

import { ErrorPage } from '~/pages/_errors/error-page.component';
import { ButtonNavigate, ErrorPageType } from '~/pages/_errors/errors.types';

export const BadReport: FC = () => {
  return (
    <ErrorPage
      pageType={ErrorPageType.BadReport}
      buttonNavigate={ButtonNavigate.Back}
      showButton={false}
      showLogo={false}
    />
  );
};
