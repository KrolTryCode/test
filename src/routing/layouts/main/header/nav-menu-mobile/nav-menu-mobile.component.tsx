import { Menu as MenuIcon, MenuOpen as MenuOpenIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useMatches } from 'react-router-dom';

import { useNavMenu } from '~/routing/layouts/main/header/use-nav-menu.hook';

import { ExternalLinksAccordion } from './nav-accordion/external-links-accordion.component';
import { NavAccordion } from './nav-accordion/nav-accordion.component';
import { StyledDrawer, StyledNavMenu } from './nav-menu-mobile.style';

export const NavMenuMobile: FC = () => {
  const matches = useMatches();
  const { t } = useTranslation();

  const { topMenuRoutes, externalLinks } = useNavMenu();

  const [isOpened, setIsOpened] = useState(false);
  const toggleOpen = () => setIsOpened(prev => !prev);

  return (
    <>
      <ToggleMenuButton isMenuOpen={isOpened} onClick={toggleOpen} />
      <StyledDrawer open={isOpened} anchor={'bottom'}>
        <StyledNavMenu>
          {topMenuRoutes.map(({ path, menuDisplay, children }) =>
            children?.some(ch => ch.menuDisplay) ? (
              <NavAccordion
                path={path}
                key={path}
                title={t(menuDisplay?.label ?? '')}
                childrenRoutes={children}
                defaultExpanded={matches.some(match => match.pathname.includes(path ?? ''))}
                onRouteClick={() => setIsOpened(false)}
              />
            ) : (
              <Box key={path} sx={{ a: { textDecoration: 'none' } }}>
                <NavLink to={path!} onClick={() => setIsOpened(false)}>
                  {t(menuDisplay!.label)}
                </NavLink>
              </Box>
            ),
          )}

          {!!externalLinks?.length && (
            <ExternalLinksAccordion title={t('ENTITY.EXTERNAL_SERVICES')} links={externalLinks} />
          )}
        </StyledNavMenu>
      </StyledDrawer>
    </>
  );
};

function ToggleMenuButton({ isMenuOpen, onClick }: { isMenuOpen: boolean; onClick: () => void }) {
  const Icon = isMenuOpen ? MenuOpenIcon : MenuIcon;

  return (
    <IconButton onClick={onClick} sx={{ fontSize: '40px', color: 'white' }}>
      <Icon fontSize={'inherit'} />
    </IconButton>
  );
}
