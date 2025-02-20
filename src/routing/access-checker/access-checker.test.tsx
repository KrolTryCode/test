import { RouterProvider } from '@tanstack/react-router';
import { screen } from '@testing-library/react';
import { t } from 'i18next';
import { describe } from 'vitest';

import { mockedNavigate } from 'tests/__mocks__/@tanstack/react-router.mock';
import { renderComponent } from 'tests/utils/render-component';
import { clearUserData, setUserData } from '~/app/user/user.store';

import { router } from '../router';

import { AccessChecker } from './access-checker.component';

export const PROTECTED_CONTENT = 'PROTECTED CONTENT';

describe('Access checker', () => {
  beforeEach(() => {
    const favicon = document.createElement('link');
    favicon.id = 'favicon';
  });

  it('should render children when access is not required and user is logged in', async () => {
    setUserData({ permissions: [] });

    renderComponent(<AccessChecker>{PROTECTED_CONTENT}</AccessChecker>, {
      route: '/profile',
    });

    expect(await screen.findByText(PROTECTED_CONTENT)).toBeInTheDocument();
  });

  it('should render forbidden page when logged in but no access', async () => {
    setUserData({ permissions: [] });

    renderComponent(<RouterProvider router={router} />, { route: '/admin/users' });

    expect(await screen.findByText(t('ERROR.FORBIDDEN.TEXT1'))).toBeInTheDocument();
  });

  it('should render children when logged in and has access', async () => {
    setUserData({ permissions: ['ADMIN'] });

    renderComponent(<AccessChecker>{PROTECTED_CONTENT}</AccessChecker>, {
      route: '/admin/users',
    });

    expect(await screen.findByText(PROTECTED_CONTENT)).toBeInTheDocument();
  });

  it('should redirect to login page when not logged in', async () => {
    clearUserData();

    renderComponent(<RouterProvider router={router} />, { route: '/projects' });
    expect(await screen.findByText('Загрузка...')).not.toBeInTheDocument();

    expect(mockedNavigate).toHaveBeenCalledWith({ to: '/auth/login' });
  });

  it('should redirect to home page when logged in and on login page', () => {
    setUserData({ permissions: ['ADMIN'] });

    renderComponent(<AccessChecker>{PROTECTED_CONTENT}</AccessChecker>, {
      route: '/auth/login',
    });

    expect(mockedNavigate).toHaveBeenCalledWith({ to: '/projects' });
  });
});
