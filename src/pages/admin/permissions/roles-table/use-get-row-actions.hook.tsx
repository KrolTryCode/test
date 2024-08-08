import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  GridActionsCellItem,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
} from '@mui/x-data-grid-premium';
import { GridApiPremium } from '@mui/x-data-grid-premium/models/gridApiPremium';
import { MutableRefObject, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRemoveRoleMutation } from '~/api/queries/roles/remove-role.mutation';
import { Role } from '~/api/utils/api-requests';
import { DeleteCellButton } from '~/components/delete-cell-button/delete-cell-button.component';
import { notifySuccess } from '~/ui-components/notifications/notifications';
import { showErrorMessage } from '~/utils/show-error-message';

export const useGetRowActions = (apiRef: MutableRefObject<GridApiPremium>) => {
  const { t } = useTranslation();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const editClickHandler = useCallback(
    (id: string) => (): void => {
      apiRef.current.startRowEditMode({ id });
    },
    [apiRef],
  );

  const saveClickHandler = useCallback(
    (id: string) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    },
    [rowModesModel],
  );

  const cancelClickHandler = useCallback(
    (id: string) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    },
    [rowModesModel],
  );

  const { mutate: removeRole } = useRemoveRoleMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const getActions = useCallback(
    ({ row: { id } }: GridRowParams<Role>) => {
      const isInEditMode = rowModesModel[id!]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            key={'save'}
            icon={<SaveIcon />}
            title={t('BUTTON.SAVE')}
            label={t('BUTTON.SAVE')}
            onClick={saveClickHandler(id!)}
          />,
          <GridActionsCellItem
            key={'cancel'}
            icon={<CancelIcon />}
            title={t('BUTTON.CANCEL')}
            label={t('BUTTON.CANCEL')}
            className={'textPrimary'}
            onClick={cancelClickHandler(id!)}
            color={'inherit'}
          />,
        ];
      }

      return [
        <GridActionsCellItem
          key={'edit'}
          showInMenu={false}
          icon={<EditIcon />}
          title={t('BUTTON.EDIT', { type: t('ENTITY.ROLE').toLowerCase() })}
          label={t('BUTTON.EDIT', { type: t('ENTITY.ROLE').toLowerCase() })}
          onClick={editClickHandler(id!)}
        />,
        <DeleteCellButton key={'delete'} deleteHandler={() => removeRole(id!)} />,
      ];
    },
    [cancelClickHandler, editClickHandler, removeRole, rowModesModel, saveClickHandler, t],
  );

  return {
    rowModesModel,
    onRowModesModelChange: setRowModesModel,
    getActions,
  };
};
