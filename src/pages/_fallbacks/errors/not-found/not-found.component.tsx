import { FC } from 'react';

import { FallbackInfoPage } from '~/pages/_fallbacks/fallback-info-page.component';
import { ButtonNavigate, FallbackPageType } from '~/pages/_fallbacks/fallback.types';

export const NotFoundPage: FC = () => {
  return (
    <FallbackInfoPage
      pageType={FallbackPageType.NotFoundPage}
      buttonNavigate={ButtonNavigate.ToMain}
    />
  );
};

export const NotFoundTask: FC<{ showButton?: boolean }> = ({ showButton }) => {
  return (
    <FallbackInfoPage
      pageType={FallbackPageType.NotFoundTask}
      buttonNavigate={ButtonNavigate.Back}
      showButton={showButton}
    />
  );
};

export const NotFoundLogs: FC = () => {
  return (
    <FallbackInfoPage
      pageType={FallbackPageType.NotFoundLogs}
      buttonNavigate={ButtonNavigate.Back}
      showButton={false}
      showLogo={false}
    />
  );
};

export const NotFoundOrders: FC = () => {
  return (
    <FallbackInfoPage
      pageType={FallbackPageType.NotFoundOrders}
      buttonNavigate={ButtonNavigate.Back}
      showButton={false}
      showLogo={false}
    />
  );
};

export const NotFoundNodes: FC<{ action: () => void }> = ({ action }) => {
  return (
    <FallbackInfoPage
      pageType={FallbackPageType.NotFoundNodes}
      buttonNavigate={ButtonNavigate.CreateNode}
      createNodeAction={action}
      logoKey={'indiana'}
    />
  );
};
