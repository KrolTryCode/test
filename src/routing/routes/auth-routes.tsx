import { Navigate } from 'react-router-dom';

import { RouteDescription } from '~/routing/routes.types';
import {
  accountReactivationPath,
  accountRecoveryPath,
  loginPath,
  registerPath,
  registrationPath,
  resetPasswordPath,
} from '~/utils/configuration/routes-paths';

export const authRoutes: RouteDescription[] = [
  {
    isIndex: true,
    element: <Navigate to={loginPath} replace={true} />,
  },
  {
    path: loginPath,
    title: 'USER.LOGIN',
    lazyElement: () => import('~/pages/auth/login/login.page'),
  },
  {
    path: registerPath,
    title: 'ACCOUNT.CREATION_TITLE',
    lazyElement: () => import('~/pages/admin/accounts/create-account/create-account.page'),
  },
  {
    path: registrationPath,
    title: 'ACTION.REGISTER',
    lazyElement: () => import('~/pages/auth/register.page'),
  },
  {
    path: accountRecoveryPath,
    title: 'ACTION.RECOVER',
    lazyElement: () => import('~/pages/auth/account-recovery.page'),
  },
  {
    path: accountReactivationPath,
    title: 'ACTION.REACTIVATE',
    lazyElement: () => import('~/pages/auth/account-reactivation.page'),
  },
  {
    path: resetPasswordPath,
    lazyElement: () => import('~/pages/auth/forgot-password/forgot-password.page'),
  },
];
