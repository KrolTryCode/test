import { Divider, Link as MuiLink } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavMenu } from '../use-nav-menu.hook';

import { HeaderNavLink } from './header-nav-link/header-nav-link.component';
import { StyledHeaderNav } from './nav-menu-desktop.style';

export const NavMenuDesktop: FC = () => {
  const { t } = useTranslation();
  const { topMenuRoutes, externalLinks } = useNavMenu();

  return (
    <StyledHeaderNav>
      {topMenuRoutes.map(({ path, menuDisplay }) => (
        <HeaderNavLink to={path!} key={path} paddingInline={2}>
          {t(menuDisplay!.label)}
        </HeaderNavLink>
      ))}

      <Divider orientation={'vertical'} hidden={!externalLinks?.length} />

      {externalLinks?.map(link => (
        <MuiLink
          key={link.order}
          href={link.url}
          underline={'hover'}
          target={'_blank'}
          rel={'noopener noreferrer'}
          paddingInline={1}
        >
          {link.name}
        </MuiLink>
      ))}
    </StyledHeaderNav>
  );
};
