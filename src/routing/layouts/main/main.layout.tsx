import Stack from '@mui/material/Stack';
import { Outlet } from 'react-router-dom';

import { Header } from './header/header.component';
import styles from './main-layout.module.scss';
import { Submenu } from './submenu/submenu.component';

export const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Submenu />
      <Stack component={'main'} gap={1} padding={1}>
        <Outlet />
      </Stack>
    </div>
  );
};
