import { Close as CancelIcon, Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import {
  GridActionsCellItem,
  GridActionsColDef,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridValidRowModel,
} from '@mui/x-data-grid-premium';
import { GridApiPremium } from '@mui/x-data-grid-premium/models/gridApiPremium';
import { DeleteCellButton } from '@pspod/ui-components';
import { MutableRefObject, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface UseGetEditRowActionsProps<T extends GridValidRowModel = Record<string, any>> {
  idKey?: keyof T;
  entityAccusative?: string;
  apiRef: MutableRefObject<GridApiPremium>;
  protectedKey?: keyof T;
  onCancelUpdate?: (id: string) => void;
}

export const useGetEditRowActions = <T extends GridValidRowModel = Record<string, any>>({
  idKey = 'id',
  entityAccusative,
  apiRef,
  protectedKey = '',
  onCancelUpdate,
}: UseGetEditRowActionsProps<T>) => {
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
    (id: string) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
      onCancelUpdate?.(id);
    },
    [onCancelUpdate, rowModesModel],
  );

  const getActions = useCallback(
    (deleteHandler: (id: string) => void): GridActionsColDef<T>['getActions'] =>
      ({ row }: GridRowParams<T>) => {
        const id = row[idKey];
        const isInEditMode = rowModesModel[id!]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={'save'}
              icon={<SaveIcon />}
              title={t('ACTION.SAVE')}
              label={t('ACTION.SAVE')}
              color={'primary'}
              onClick={saveClickHandler(id)}
            />,
            <GridActionsCellItem
              key={'cancel'}
              icon={<CancelIcon />}
              title={t('ACTION.CANCEL')}
              label={t('ACTION.CANCEL')}
              className={'textPrimary'}
              onClick={cancelClickHandler(id)}
              color={'inherit'}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={'edit'}
            showInMenu={false}
            icon={<EditIcon />}
            title={t('STRUCTURE.EDIT_ROW')}
            label={t('STRUCTURE.EDIT_ROW')}
            onClick={editClickHandler(id)}
          />,
          <DeleteCellButton
            key={'delete'}
            entity={entityAccusative}
            disabled={row[protectedKey]}
            deleteHandler={() => deleteHandler(id)}
          />,
        ];
      },
    [
      cancelClickHandler,
      editClickHandler,
      rowModesModel,
      saveClickHandler,
      idKey,
      entityAccusative,
      protectedKey,
      t,
    ],
  );

  return {
    rowModesModel,
    onRowModesModelChange: setRowModesModel,
    getActions,
  };
};
