import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const AddEntity: FC<{ onClick: () => void }> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <Button onClick={onClick} startIcon={<Add />}>
      {t('BUTTON.ADD')}
    </Button>
  );
};
