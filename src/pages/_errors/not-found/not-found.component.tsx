import { FC } from 'react';

import { ErrorPage } from '~/pages/_errors/error-page.component';
import { ButtonNavigate, ErrorPageType } from '~/pages/_errors/errors.types';

export const NotFoundPage: FC = () => {
  return <ErrorPage pageType={ErrorPageType.NotFoundPage} buttonNavigate={ButtonNavigate.ToMain} />;
};

export const NotFoundTask: FC<{ showButton?: boolean }> = ({ showButton }) => {
  return (
    <ErrorPage
      pageType={ErrorPageType.NotFoundTask}
      buttonNavigate={ButtonNavigate.Back}
      showButton={showButton}
    />
  );
};

export const NotFoundLogs: FC = () => {
  return (
    <ErrorPage
      pageType={ErrorPageType.NotFoundLogs}
      buttonNavigate={ButtonNavigate.Back}
      showButton={false}
      showLogo={false}
    />
  );
};

export const NotFoundOrders: FC = () => {
  return (
    <ErrorPage
      pageType={ErrorPageType.NotFoundOrders}
      buttonNavigate={ButtonNavigate.Back}
      showButton={false}
      showLogo={false}
    />
  );
};
