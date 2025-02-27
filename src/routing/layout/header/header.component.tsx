import { Notifications } from '@mui/icons-material';
import { Badge, Box, useMediaQuery, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getNotificationsListOptions } from '~/api/queries/notifications/get-notifications-list.query';
import { selectUnreadNotificationsCount } from '~/api/selectors/select-notifications';
import { logo } from '~/utils/configuration/design/logo';
import { useAppDesignConfig } from '~/utils/configuration/design/use-app-design-config.hook';
import { createObjectURLFromFile } from '~/utils/files/create-object-url-from-file';
import { useServerPagingParams } from '~/utils/hooks';

import { QuestionMarkWrapper, StyledHeader, StyledHeaderHelp } from './header.style';
import { NavMenuDesktop } from './nav-menu-desktop/nav-menu-desktop.component';
import { NavMenuMobile } from './nav-menu-mobile/nav-menu-mobile.component';
import { UserMenu } from './user-menu/user-menu.component';

const Header: FC = () => {
  const { t } = useTranslation();
  const { appMainLogo } = useAppDesignConfig();
  const { data: unreadCount } = useQuery(
    getNotificationsListOptions(useServerPagingParams(), {
      select: selectUnreadNotificationsCount,
    }),
  );
  const imgSrc = useMemo(() => createObjectURLFromFile(appMainLogo), [appMainLogo]);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const DEFAULT_APP_MAIN_LOGO = logo['logoSmall'];

  return (
    <StyledHeader>
      <Box hidden={!isDesktop} marginBlock={'auto'} marginRight={2}>
        <Box
          component={'img'}
          display={'block'}
          src={imgSrc ?? DEFAULT_APP_MAIN_LOGO}
          className={'logo'}
          alt={t('PROJECT_NAME').toString()}
        />
      </Box>

      {isDesktop ? <NavMenuDesktop /> : <NavMenuMobile />}

      <Box
        display={'flex'}
        flexDirection={'row'}
        marginLeft={'auto'}
        alignItems={'center'}
        paddingRight={1}
      >
        <StyledHeaderHelp to={'/Help.pdf'} target={'_blank'} download>
          <QuestionMarkWrapper>?</QuestionMarkWrapper>
        </StyledHeaderHelp>
        <Link to={'/notifications'}>
          <Badge badgeContent={unreadCount} color={'info'}>
            <Notifications sx={{ color: 'white' }} />
          </Badge>
        </Link>
      </Box>
      <UserMenu />
    </StyledHeader>
  );
};

export { Header };
