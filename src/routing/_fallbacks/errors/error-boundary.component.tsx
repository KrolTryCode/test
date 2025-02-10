import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { LogTextOutput } from '~/components/log-text-output/log-text-output.component';

export interface RouteErrorBoundaryProps {
  error: Error;
}

export const RouteErrorBoundary: FC<RouteErrorBoundaryProps> = ({ error }) => {
  const { t } = useTranslation();

  if (
    error instanceof TypeError &&
    error.message.includes('Failed to fetch dynamically imported module')
  ) {
    window.location.reload();
  }

  return (
    <Box height={'100%'} display={'flex'}>
      <Box width={'80%'} margin={'auto'}>
        <Typography variant={'h2'}>{t('ERROR.BOUNDARY.HEADER')}</Typography>
        <Typography fontSize={18} marginBottom={'1em'}>
          {t('ERROR.BOUNDARY.DESCRIPTION')}
        </Typography>
        <LogTextOutput>{String(error.stack)}</LogTextOutput>
      </Box>
    </Box>
  );
};
