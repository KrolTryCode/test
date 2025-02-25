import { Box, Typography } from '@mui/material';
import { Image } from '@pspod/ui-components';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getDesignConfigurationQueryOptions } from '~/api/queries/design/get-design-configuration.query';
import { getDesignLogoQueryOptions } from '~/api/queries/design/get-design-logo.query';
import { logo } from '~/utils/configuration/design/logo';
import { createObjectURLFromFile } from '~/utils/files';

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
  loader: async ({ context }) => {
    const appLoginLogo = await context.queryClient.fetchQuery(
      getDesignLogoQueryOptions('loginLogo'),
    );
    const { loginPageText } = await context.queryClient.fetchQuery(
      getDesignConfigurationQueryOptions(),
    );
    return { appLoginLogo, appHelloText: loginPageText };
  },
});

function AuthLayout() {
  const { t, i18n } = useTranslation();
  const { appHelloText, appLoginLogo } = Route.useLoaderData();

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
