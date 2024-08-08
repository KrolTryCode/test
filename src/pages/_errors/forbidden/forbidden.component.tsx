import { FC } from 'react';

import { ErrorPage } from '~/pages/_errors/error-page.component';
import { ButtonNavigate, ErrorPageType } from '~/pages/_errors/errors.types';

export const ForbiddenPage: FC = () => {
  return <ErrorPage pageType={ErrorPageType.Forbidden} buttonNavigate={ButtonNavigate.ToMain} />;
};
