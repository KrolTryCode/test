import { FC, PropsWithChildren, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useUserStore } from '~/app/user/user.store';
import { ForbiddenPage } from '~/pages/_fallbacks/errors/forbidden/forbidden.component';
import { useRouteAccess } from '~/routing/access-checker/use-route-access';
import { authPath, homePath, loginPath } from '~/utils/configuration/routes-paths';

export const AccessChecker: FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useUserStore(store => store.isLoggedIn);
  const location = useLocation();
  const navigate = useNavigate();
  const hasAccess = useRouteAccess();

  useEffect(() => {
    if (location.pathname === `/${authPath}/${loginPath}` && isLoggedIn) {
      navigate(homePath);
    } else {
      if (!location.pathname.startsWith(`/${authPath}`) && !isLoggedIn) {
        navigate(`/${authPath}/${loginPath}`);
      }
    }
  }, [location, isLoggedIn, navigate]);

  return hasAccess ? <>{children}</> : <ForbiddenPage />;
};
