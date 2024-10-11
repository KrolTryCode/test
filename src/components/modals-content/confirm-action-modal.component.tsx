import { Stack } from '@mui/material';
import { Button } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { modal } from '~/components/modal/modal';

interface ConfirmActionModalContent {
  onResolve: () => void;
  onReject: () => void;
  rejectText?: string;
  acceptText?: string;
}

export const ConfirmActionModalContent: FC<ConfirmActionModalContent> = ({
  onResolve,
  onReject,
  rejectText = 'COMMON.NO',
  acceptText = 'COMMON.YES',
}) => {
  const { t } = useTranslation();
  return (
    <Stack direction={'row'} gap={2} justifyContent={'flex-end'}>
      <Button onClick={onReject}>{t(rejectText)}</Button>
      <Button variant={'contained'} color={'error'} onClick={onResolve}>
        {t(acceptText)}
      </Button>
    </Stack>
  );
};

interface ConfirmModal {
  onOk: () => void;
  title: string;
}

export const confirmActionModal = ({ onOk, title }: ConfirmModal) => {
  modal({
    onOk,
    title,
    renderContent: instanceProps => <ConfirmActionModalContent {...instanceProps} />,
  });
};
