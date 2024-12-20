import { Box, useMediaQuery, useTheme } from '@mui/material';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { logo } from '~/utils/configuration/logo';
import { homePath } from '~/utils/configuration/routes-paths';
import { useAppDesignConfig } from '~/utils/configuration/use-app-design-config.hook';
import { createObjectURLFromFile } from '~/utils/files/create-object-url-from-file';

import { QuestionMarkWrapper, StyledHeader, StyledHeaderHelp } from './header.style';
import { NavMenuDesktop } from './nav-menu-desktop/nav-menu-desktop.components';
import { NavMenuMobile } from './nav-menu-mobile/nav-menu-mobile.component';
import { UserMenu } from './user-menu/user-menu.component';

interface HeaderProps {
  className?: string;
}

const Header: FC<HeaderProps> = ({ className }) => {
  const { t } = useTranslation();
  const { appMainLogo } = useAppDesignConfig();
  const imgSrc = useMemo(() => createObjectURLFromFile(appMainLogo), [appMainLogo]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const DEFAULT_APP_MAIN_LOGO = logo['logoSmall'];

  return (
    <StyledHeader className={className}>
      {matches ? (
        <>
          <Box margin={'auto 0'}>
            <Link to={homePath}>
              <img
                src={imgSrc ?? DEFAULT_APP_MAIN_LOGO}
                className={'logo'}
                alt={t('PROJECT_NAME')}
              />
            </Link>
          </Box>

          <NavMenuDesktop />
        </>
      ) : (
        <NavMenuMobile />
      )}
      <Box display={'flex'} flexDirection={'row'} marginLeft={'auto'}>
        <StyledHeaderHelp to={'/Help.pdf'} target={'_blank'} download>
          <QuestionMarkWrapper>?</QuestionMarkWrapper>
        </StyledHeaderHelp>
      </Box>
      <UserMenu />
    </StyledHeader>
  );
};

export { Header };
