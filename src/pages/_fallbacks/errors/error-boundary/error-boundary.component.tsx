import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';

import { LogTextOutput } from '~/components/log-text-output/log-text-output.styled';

export const RouteErrorBoundary = () => {
  const { t } = useTranslation();
  const error = useRouteError();
  return (
    <Box height={'100dvh'} display={'flex'}>
      <Box width={'80%'} margin={'auto'}>
        <Typography variant={'h2'}>{t('ERROR.BOUNDARY.HEADER')}</Typography>
        <Typography fontSize={18} marginBottom={'1em'}>
          {t('ERROR.BOUNDARY.DESCRIPTION')}
        </Typography>
        <LogTextOutput>{String((error as Error).stack)}</LogTextOutput>
      </Box>
    </Box>
  );
};
