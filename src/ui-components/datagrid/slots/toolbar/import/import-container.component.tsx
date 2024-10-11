import { PublishOutlined as ImportIcon } from '@mui/icons-material';
import { DropdownMenu } from '@pspod/ui-components';
import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export const ImportContainer: FC<{ importToolbarContent: ReactNode }> = ({
  importToolbarContent,
}) => {
  const { t } = useTranslation();
  return (
    <DropdownMenu
      buttonSize={'medium'}
      buttonContent={t('ACTION.IMPORT')}
      icon={<ImportIcon />}
      showArrow={false}
    >
      {importToolbarContent}
    </DropdownMenu>
  );
};
