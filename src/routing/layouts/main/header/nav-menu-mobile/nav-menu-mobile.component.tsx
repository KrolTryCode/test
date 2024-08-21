import { Box, Stack } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatches } from 'react-router-dom';

import { useNavMenu } from '~/routing/layouts/main/header/use-nav-menu.hook';

import { NavAccordion } from './nav-accordion/nav-accordion.component';
import { StyledMenuIcon, StyledMenuNavLink, StyledMenuOpenIcon } from './nav-menu-mobile.style';

export const NavMenuMobile: FC = () => {
  const matches = useMatches();

  const [isOpened, setIsOpened] = useState(false);
  const { topMenuRoutes } = useNavMenu();

  const { t } = useTranslation();

  const toggleOpen = () => setIsOpened(prev => !prev);

  return (
    <>
      <Stack>
        {!isOpened ? (
          <StyledMenuIcon onClick={toggleOpen} />
        ) : (
          <StyledMenuOpenIcon onClick={toggleOpen} />
        )}
      </Stack>
      {isOpened && (
        <Stack
          direction={'column'}
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
                {children?.some(ch => ch.menuDisplay) ? (
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
        </Stack>
      )}
    </>
  );
};
