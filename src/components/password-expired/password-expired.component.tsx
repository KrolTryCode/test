import { Card, Stack, Typography } from '@mui/material';
import { Button } from '@pspod/ui-components';
import { SnackbarContent, CustomContentProps, enqueueSnackbar, closeSnackbar } from 'notistack';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigateFunction } from 'react-router-dom';

import { profilePath } from '~/utils/configuration/routes-paths';

interface PasswordExpiredProps extends CustomContentProps {
  navigate: NavigateFunction;
}

const PasswordExpired = forwardRef<HTMLDivElement, PasswordExpiredProps>(function PasswordExpired(
  { id, iconVariant, navigate },
  ref,
) {
  const { t } = useTranslation();

  const handleGo = () => {
    navigate(`/${profilePath}`);
    closeSnackbar(id);
  };

  return (
    <SnackbarContent ref={ref}>
      <Card>
        <Stack
          paddingBlock={1}
          paddingInline={2}
          sx={({ palette }) => ({
            color: '#fff',
            backgroundColor: palette.warning.main,
          })}
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          {iconVariant['warning']}
          <Typography gutterBottom={false}>{t('AUTH.PASSWORD.EXPIRES_SOON')}</Typography>
        </Stack>
        <Stack gap={1} paddingBlock={1} paddingLeft={2} paddingRight={1}>
          <Typography>{t('AUTH.PASSWORD.CHANGE')}</Typography>
          <Stack direction={'row'} justifyContent={'flex-end'}>
            <Button variant={'text'} color={'error'} onClick={() => closeSnackbar(id)}>
              {t('ACTION.CLOSE')}
            </Button>
            <Button variant={'text'} color={'primary'} onClick={handleGo}>
              {t('ACTION.GO')}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </SnackbarContent>
  );
});

// eslint-disable-next-line import/no-default-export
export default PasswordExpired;

export const notifyPasswordExpired = (navigate: PasswordExpiredProps['navigate']) => {
  enqueueSnackbar('', {
    // @ts-expect-error custom variant
    variant: 'passwordExpired',
    persist: true,
    preventDuplicate: true,
    navigate,
  });
};
