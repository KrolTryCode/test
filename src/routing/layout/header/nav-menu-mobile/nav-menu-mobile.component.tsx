import { Menu as MenuIcon, MenuOpen as MenuOpenIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { Link, useMatches } from '@tanstack/react-router';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUserStore } from '~/app/user/user.store';
import { Route } from '~/pages/_main';

import { ExternalLinksAccordion } from './nav-accordion/external-links-accordion.component';
import { NavAccordion } from './nav-accordion/nav-accordion.component';
import { StyledDrawer, StyledNavMenu } from './nav-menu-mobile.style';

export const NavMenuMobile: FC = () => {
  const matches = useMatches();
  const { t } = useTranslation();

  const userRoles = useUserStore(state => state.data?.permissions ?? []);

  const menuItemsData = useMemo(() => {
    return (Route.children as (typeof Route)[])
      ?.filter(
        ({ options: { staticData } }) =>
          /* RBAC */
          (!staticData?.accessBy || staticData.accessBy.some(role => userRoles.includes(role))) &&
          /* display info */
          Number(staticData?.order ?? -1) >= 0,
      )
      .map(({ path, children, id, options: { staticData } }) => {
        const subRoutes = (children as (typeof Route)[])
          ?.filter(r => !r.path.includes('$') && Number(r.options.staticData?.order ?? -1) >= 0)
          .toSorted(
            (a, b) => Number(a.options?.staticData?.order) - Number(b.options?.staticData?.order),
          );
        const title = t(staticData?.title ?? '');
        const hasVisibleChild = subRoutes?.some(({ options: { staticData } }) => staticData?.title);

        return {
          path,
          title,
          id,
          hasVisibleChild,
          subRoutes,
        };
      });
  }, [t, userRoles]);

  const [isOpened, setIsOpened] = useState(false);
  const toggleOpen = () => setIsOpened(prev => !prev);

  return (
    <>
      <ToggleMenuButton isMenuOpen={isOpened} onClick={toggleOpen} />
      <StyledDrawer open={isOpened} anchor={'bottom'}>
        <StyledNavMenu>
          {menuItemsData.map(({ path, title, id, hasVisibleChild, subRoutes }) => {
            return hasVisibleChild ? (
              <NavAccordion
                key={id}
                title={title}
                //@ts-expect-error isRoot
                childrenRoutes={subRoutes}
                defaultExpanded={matches.some(match => match.pathname.includes(path ?? ''))}
                onRouteClick={() => setIsOpened(false)}
              />
            ) : (
              <Box key={id}>
                <Link to={path} onClick={() => setIsOpened(false)}>
                  {title}
                </Link>
              </Box>
            );
          })}

          <ExternalLinksAccordion />
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
