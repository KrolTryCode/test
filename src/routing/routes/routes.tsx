import { Navigate } from 'react-router-dom';

import { NotFoundPage } from '~/pages/_errors/not-found/not-found.component';
import { AuthLayout } from '~/routing/layouts/auth/auth.layout';
import { MainLayout } from '~/routing/layouts/main/main.layout';
import { authRoutes } from '~/routing/routes/auth-routes';
import { adminPath, authPath, homePath, profilePath } from '~/utils/configuration/routes-paths';

import { RouteDescription } from '../routes.types';

import { adminSubroutes } from './admin-subroutes';

export const routes: RouteDescription[] = [
  {
    key: 'main',
    path: homePath,
    element: <MainLayout />,
    children: [
      {
        isIndex: true,
        element: <Navigate to={adminPath} replace={true} />,
      },
      {
        path: adminPath,
        menuDisplay: { label: 'NAVIGATION.ADMIN' },
        children: adminSubroutes,
        accessBy: ['ADMIN'],
      },
      {
        path: profilePath,
        title: 'USER.LABEL',
        lazyElement: () => import('~/pages/profile/profile.page'),
      },
    ],
  },
  {
    path: authPath,
    element: <AuthLayout />,
    children: authRoutes,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
