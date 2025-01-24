import { Typography, useMediaQuery, Theme } from '@mui/material';
import { useLocation } from '@tanstack/react-router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { TabLink } from '~/components/implicit-links';

import { StyledTabs } from './submenu.style';
import { useSubMenu } from './use-submenu.hook';

export const Submenu: FC = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const items = useSubMenu();
  const { pathname } = useLocation();

  /* 2nd path segment */
  const navValue = pathname.split('/').at(2);

  if (!items.length || isMobile || !navValue) {
    return null;
  }

  return (
    <StyledTabs
      component={'nav'}
      value={navValue}
      variant={'scrollable'}
      visibleScrollbar
      scrollButtons={'auto'}
    >
      {items.map(({ options: { staticData }, fullPath, path, id }) => (
        <TabLink
          iconPosition={'start'}
          key={id}
          //@ts-expect-error no check string literal
          to={fullPath}
          value={path.replace(/\/$/, '')}
          label={
            <Typography variant={'subtitle2'} component={'h1'} gutterBottom={false}>
              {t(staticData!.title!)}
            </Typography>
          }
        />
      ))}
    </StyledTabs>
  );
};
