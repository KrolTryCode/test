import { Stack } from '@mui/material';
import { createFileRoute, Outlet } from '@tanstack/react-router';

import { Header } from '~/routing/layout/header/header.component';
import { Submenu } from '~/routing/layout/submenu/submenu.component';
import { useNotifyAboutNewNotification } from '~/use-cases/use-notify-about-new-notification.hook';

export const Route = createFileRoute('/_main')({
  component: MainLayout,
});

function MainLayout() {
  useNotifyAboutNewNotification();

  return (
    <Stack width={'100vw'} height={'100dvh'}>
      <Header />
      <Submenu />
      <Stack component={'main'} zIndex={1} flex={1} overflow={'auto'} gap={1} padding={1}>
        <Outlet />
      </Stack>
    </Stack>
  );
}
