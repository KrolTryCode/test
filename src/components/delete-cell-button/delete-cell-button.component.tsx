import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { confirmDeletionModal } from '../modals-content/deletion-confirmation-modal.component';

interface DeleteCellButtonProps {
  deleteHandler: () => void;
  showInMenu?: boolean;
  disabled?: boolean;
}

export const DeleteCellButton: FC<DeleteCellButtonProps> = ({
  showInMenu = false,
  deleteHandler,
  disabled,
}) => {
  const { t } = useTranslation();

  const openDeletionConfirmationModal = useCallback(
    () => confirmDeletionModal({ onOk: deleteHandler, title: t('MESSAGE.CONFIRM_DELETE') }),
    [deleteHandler, t],
  );

  return (
    // @ts-expect-error types
    <GridActionsCellItem
      showInMenu={showInMenu}
      disabled={disabled}
      icon={showInMenu ? undefined : <DeleteIcon />}
      color={'error'}
      title={t('BUTTON.DELETE')}
      label={t('BUTTON.DELETE')}
      onClick={openDeletionConfirmationModal}
    />
  );
};
