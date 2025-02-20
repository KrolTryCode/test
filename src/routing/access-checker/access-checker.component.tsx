import { useLocation, useNavigate } from '@tanstack/react-router';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useUserStore } from '~/app/user/user.store';
import { ForbiddenPage } from '~/routing/_fallbacks/cases/forbidden.component';
import { useRouteAccess } from '~/routing/access-checker/use-route-access';

export const AccessChecker: FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useUserStore(store => store.isLoggedIn);
  const location = useLocation();
  const navigate = useNavigate();
  const hasAccess = useRouteAccess();

  useEffect(() => {
    if (isLoggedIn && (location.pathname === '/' || location.pathname.startsWith('/auth'))) {
      void navigate({ to: '/projects' });
    } else {
      if (!isLoggedIn && !location.pathname.startsWith('/auth')) {
        void navigate({ to: '/auth/login' });
      }
    }
  }, [location, isLoggedIn, navigate]);

  return hasAccess ? <>{children}</> : <ForbiddenPage />;
};
