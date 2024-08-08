import { Box, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo/logo-small.png';
import { planPath } from '~/utils/configuration/routes-paths';

import { QuestionMarkWrapper, StyledHeader, StyledHeaderHelp } from './header.style';
import { NavMenuDesktop } from './nav-menu-desktop/nav-menu-desktop.components';
import { NavMenuMobile } from './nav-menu-mobile/nav-menu-mobile.component';
import { UserMenu } from './user-menu/user-menu.component';

interface HeaderProps {
  className?: string;
}

const Header: FC<HeaderProps> = ({ className }) => {
  const { t } = useTranslation();

  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <StyledHeader className={className}>
      {matches ? (
        <>
          <Box margin={'auto 0'}>
            <Link to={planPath}>
              <img src={logo} alt={t('PROJECT_NAME')} />
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
