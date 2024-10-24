import { PublishOutlined as ImportIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const ImportProject: FC<{ onClick: () => void }> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <Button onClick={onClick} startIcon={<ImportIcon />}>
      {t('ACTION.IMPORT_PROJECT')}
    </Button>
  );
};
