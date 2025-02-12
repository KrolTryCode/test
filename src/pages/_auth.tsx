import { Box, Typography } from '@mui/material';
import { Image } from '@pspod/ui-components';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { logo } from '~/utils/configuration/design/logo';
import { useAppDesignConfig } from '~/utils/configuration/design/use-app-design-config.hook';
import { createObjectURLFromFile } from '~/utils/files';

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
});

function AuthLayout() {
  const { t, i18n } = useTranslation();
  const { appHelloText, appLoginLogo } = useAppDesignConfig();

  const imgSrc = useMemo(() => createObjectURLFromFile(appLoginLogo), [appLoginLogo]);

  const DEFAULT_APP_HELLO_LOGO = logo[i18n.language];
  const DEFAULT_APP_HELLO_TEXT = 'APP.HELLO_TEXT';

  return (
    <Box height={'100dvh'} display={'flex'}>
      <Box width={500} margin={'auto'}>
        <Box display={'flex'} marginBottom={2} alignItems={'center'} flexDirection={'column'}>
          <Box paddingBottom={3} maxWidth={300}>
            <Image src={imgSrc ?? DEFAULT_APP_HELLO_LOGO} alt={t('PROJECT_NAME')} />
          </Box>
          <Typography variant={'h4'}>{t(appHelloText ?? DEFAULT_APP_HELLO_TEXT)}</Typography>
        </Box>
        <Outlet />
      </Box>
    </Box>
  );
}
