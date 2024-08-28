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
import { UseMutateFunction } from '@tanstack/react-query';
import { MutableRefObject, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteCellButton } from '~/components/delete-cell-button/delete-cell-button.component';

export const useGetRowActions = <T extends { [key: string]: any; id?: string }>(
  apiRef: MutableRefObject<GridApiPremium>,
  onRemoveAction: UseMutateFunction<void | T, Error, string>,
  onRemoveActionKey: keyof T,
) => {
  const { t } = useTranslation();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const editClickHandler = useCallback(
    (id: string) => () => apiRef.current.startRowEditMode({ id }),
    [apiRef],
  );

  const saveClickHandler = useCallback(
    (id: string) => () => setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } }),
    [rowModesModel],
  );

  const cancelClickHandler = useCallback(
    (id: string) => () =>
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      }),
    [rowModesModel],
  );

  const getActions = useCallback(
    ({ row }: GridRowParams<T>) => {
      const id = row.id;
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
          title={t('STRUCTURE.EDIT_COLUMN')}
          label={t('STRUCTURE.EDIT_COLUMN')}
          onClick={editClickHandler(id!)}
        />,
        <DeleteCellButton
          key={'delete'}
          deleteHandler={() => onRemoveAction(row[onRemoveActionKey])}
        />,
      ];
    },
    [
      cancelClickHandler,
      editClickHandler,
      onRemoveAction,
      onRemoveActionKey,
      rowModesModel,
      saveClickHandler,
      t,
    ],
  );

  return {
    rowModesModel,
    onRowModesModelChange: setRowModesModel,
    getActions,
  };
};
