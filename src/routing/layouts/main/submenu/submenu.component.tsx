import { Tab, Typography, useMediaQuery, Theme } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

import { StyledTabs } from './submenu.style';
import { useSubMenu } from './use-submenu.hook';

export const Submenu: FC = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const items = useSubMenu();
  const { pathname } = useLocation();
  const isSubmenuPath = pathname.split('/').length > 2;

  if (!items.length || isMobile) {
    return null;
  }

  return (
    <StyledTabs
      component={'nav'}
      value={isSubmenuPath ? pathname.split('/').slice(0, 3).join('/') : false}
      variant={'scrollable'}
      visibleScrollbar
      scrollButtons={'auto'}
    >
      {items.map(({ label, path }) => (
        <Tab
          iconPosition={'start'}
          component={NavLink}
          key={path}
          to={path}
          label={
            <Typography variant={'subtitle2'} component={'h1'} gutterBottom={false}>
              {t(label)}
            </Typography>
          }
          value={path}
        />
      ))}
    </StyledTabs>
  );
};
