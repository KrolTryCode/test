import { Stack } from '@mui/material';
import { Preloader } from '@pspod/ui-components';
import { FC } from 'react';

export const PageLoading: FC = () => {
  return (
    <Stack width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'center'} gap={1}>
      <Preloader />
    </Stack>
  );
};
