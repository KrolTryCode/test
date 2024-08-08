import { Box, Stack } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatches } from 'react-router-dom';

import { useAppSelector } from '~/app/store.hooks';
import { selectUserAuthorities } from '~/app/user/user.store';
import { routes } from '~/routing/routes/routes';
import { RouteDescription } from '~/routing/routes.types';

import { NavAccordion } from './nav-accordion/nav-accordion.component';
import { StyledMenuIcon, StyledMenuNavLink, StyledMenuOpenIcon } from './nav-menu-mobile.style';

export const NavMenuMobile: FC = () => {
  const matches = useMatches();

  const [isOpened, setIsOpened] = useState(false);

  const userAuthorities = useAppSelector(selectUserAuthorities);
  const { t } = useTranslation();

  const topMenuRoutes: RouteDescription[] = useMemo(() => {
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
    <>
      <Box display={'flex'}>
        {!isOpened ? (
          <StyledMenuIcon onClick={() => setIsOpened(!isOpened)} />
        ) : (
          <StyledMenuOpenIcon onClick={() => setIsOpened(!isOpened)} />
        )}
      </Box>
      {isOpened && (
        <Box
          display={'flex'}
          flexDirection={'column'}
          position={'absolute'}
          top={'68px'}
          left={'0'}
          width={'100%'}
          height={'calc(100vh - 68px)'}
          bgcolor={theme => theme.palette.primary.main}
        >
          <Stack height={'100%'} overflow={'auto'}>
            {topMenuRoutes.map(({ path, menuDisplay, children }) => (
              <Box key={path} p={2} borderBottom={'1px solid #E0E0E0'}>
                {children && children.length > 0 ? (
                  <NavAccordion
                    path={path}
                    menuDisplay={menuDisplay}
                    childrenRoutes={children}
                    defaultExpanded={matches.some(match => match.pathname.includes(path ?? ''))}
                    onRouteClick={() => setIsOpened(false)}
                  />
                ) : (
                  <StyledMenuNavLink
                    to={path!}
                    style={{ textDecoration: 'none' }}
                    onClick={() => setIsOpened(false)}
                  >
                    {t(menuDisplay!.label)}
                  </StyledMenuNavLink>
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </>
  );
};
