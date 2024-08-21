import { useTranslation } from 'react-i18next';

import { useNavMenu } from '../use-nav-menu.hook';

import { HeaderNavLink } from './header-nav-link/header-nav-link.component';
import { StyledHeaderNav } from './nav-menu-desktop.style';

export const NavMenuDesktop = () => {
  const { t } = useTranslation();
  const { topMenuRoutes } = useNavMenu();

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
