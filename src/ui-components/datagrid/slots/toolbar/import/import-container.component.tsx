import { PublishOutlined as ImportIcon } from '@mui/icons-material';
import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { DropdownMenu } from '~/ui-components/dropdown-menu/dropdown-menu.component';

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
