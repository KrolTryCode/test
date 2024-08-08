import { FC } from 'react';

import { ErrorPage } from '~/pages/_errors/error-page.component';

import { ButtonNavigate, ErrorPageType } from '../errors.types';

const WorkInProgress: FC = () => {
  return (
    <ErrorPage pageType={ErrorPageType.WorkInProgress} buttonNavigate={ButtonNavigate.ToMain} />
  );
};

export default WorkInProgress;
