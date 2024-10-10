import { screen } from '@testing-library/react';
import { t } from 'i18next';
import { describe } from 'vitest';

import { mockedNavigate } from 'tests/__mocks__/react-router-dom.mock';
import { renderComponent } from 'tests/utils/render-component';
import { clearUserData, setUserData } from '~/app/user/user.store';
import {
  adminPath,
  authPath,
  homePath,
  loginPath,
  usersPath,
  tablesPath,
} from '~/utils/configuration/routes-paths';

import { AccessChecker } from './access-checker.component';

export const PROTECTED_CONTENT = 'PROTECTED CONTENT';

describe('Access checker', () => {
  it('should render children when access is not required and user is logged in', async () => {
    setUserData({ permissions: [] });

    renderComponent(<AccessChecker>{PROTECTED_CONTENT}</AccessChecker>, {
      withRouter: true,
      route: `/${tablesPath}`,
    });

    expect(await screen.findByText(PROTECTED_CONTENT)).toBeInTheDocument();
  });

  it('should render forbidden page when logged in but no access', async () => {
    setUserData({ permissions: ['user'] });

    renderComponent(<AccessChecker>{PROTECTED_CONTENT}</AccessChecker>, {
      withRouter: true,
      route: `/${adminPath}/${usersPath}`,
    });

    expect(await screen.findByText(t('ERROR.FORBIDDEN.TEXT1'))).toBeInTheDocument();
  });

  it('should render children when logged in and has access', async () => {
    setUserData({ permissions: ['admin'] });

    renderComponent(<AccessChecker>{PROTECTED_CONTENT}</AccessChecker>, {
      withRouter: true,
      route: `/${adminPath}/${usersPath}`,
    });

    expect(await screen.findByText(PROTECTED_CONTENT)).toBeInTheDocument();
  });

  it('should redirect to login page when not logged in', async () => {
    clearUserData();

    renderComponent(<AccessChecker>{PROTECTED_CONTENT}</AccessChecker>, {
      withRouter: true,
      route: `/${adminPath}/${usersPath}`,
    });

    expect(mockedNavigate).toHaveBeenCalledWith(`/${authPath}/${loginPath}`);
  });

  it('should redirect to home page when logged in and on login page', async () => {
    setUserData({ permissions: ['admin'] });

    renderComponent(<AccessChecker>{PROTECTED_CONTENT}</AccessChecker>, {
      withRouter: true,
      route: `/${authPath}/${loginPath}`,
    });

    expect(mockedNavigate).toHaveBeenCalledWith(homePath);
  });
});
