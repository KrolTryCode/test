import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '~/app/store.hooks';
import { selectUserAuthorities } from '~/app/user/user.store';
import { routes } from '~/routing/routes/routes';

import { HeaderNavLink } from './header-nav-link/header-nav-link.component';
import { StyledHeaderNav } from './nav-menu-desktop.style';

export const NavMenuDesktop = () => {
  const userAuthorities = useAppSelector(selectUserAuthorities);
  const { t } = useTranslation();

  const topMenuRoutes = useMemo(() => {
    return (
      routes
        .find(({ key }) => key === 'main')
        ?.children?.filter(({ menuDisplay, accessBy }) => {
          return (
            !!menuDisplay &&
            (accessBy ? accessBy.some(role => userAuthorities.includes(role)) : true)
          );
        }) ?? []
    );
  }, [userAuthorities]);

  return (
    <StyledHeaderNav>
      {topMenuRoutes.map(({ path, menuDisplay }) => (
        <HeaderNavLink to={path!} key={path}>
          {t(menuDisplay!.label)}
        </HeaderNavLink>
      ))}
    </StyledHeaderNav>
  );
};
