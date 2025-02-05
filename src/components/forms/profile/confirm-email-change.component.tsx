import { Stack, Typography } from '@mui/material';
import { Button, modal, CreateModalProps } from '@pspod/ui-components';
import { t } from 'i18next';
import { FC } from 'react';

export const ConfirmEmailChange: FC<
  Pick<CreateModalProps<Record<string, never>>, 'onResolve' | 'onReject'>
> = ({ onResolve, onReject }) => {
  return (
    <Stack direction={'column'} gap={2} width={'100%'}>
      <Typography variant={'body1'}>{t('MESSAGE.CONFIRM_LOGIN_CHANGE.TEXT')}</Typography>
      <Stack direction={'row'} gap={2} justifyContent={'flex-end'}>
        <Button onClick={onReject} variant={'outlined'} color={'primary'}>
          {t('ACTION.CANCEL')}
        </Button>
        <Button variant={'contained'} color={'primary'} onClick={onResolve}>
          {t('ACTION.APPROVE')}
        </Button>
      </Stack>
    </Stack>
  );
};

interface ConfirmEmailModalProps {
  onOk: () => Promise<void>;
}

export const confirmEmailModal = ({ onOk }: ConfirmEmailModalProps) => {
  modal({
    title: t('MESSAGE.CONFIRM_LOGIN_CHANGE.TITLE'),
    onOk,
    renderContent: instanceProps => <ConfirmEmailChange {...instanceProps} />,
  });
};
