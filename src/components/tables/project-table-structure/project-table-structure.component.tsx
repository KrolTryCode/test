import {
  GridEventListener,
  GridPreProcessEditCellProps,
  GridRowEditStopReasons,
  GridRowOrderChangeParams,
  useGridApiRef,
} from '@mui/x-data-grid-premium';
import {
  notifySuccess,
  EnhancedColDef,
  GridPagingParams,
  AddEntity,
  StringEditingCell,
} from '@pspod/ui-components';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { TableColumnExtended } from '~/api/selectors/select-node-columns';
import { DataGrid } from '~/components/datagrid/datagrid.component';
import { useGetEditRowActions } from '~/components/datagrid/use-get-edit-row-actions.hook';
import { reorderRows } from '~/utils/datagrid/reorder-rows';
import { useCustomTranslations } from '~/utils/hooks';
import { showErrorMessage } from '~/utils/show-error-message';

import { useProjectTableStructure } from './project-table-structure.hook';

interface ProjectTableStructureProps {
  tableId: string;
}

export const ProjectTableStructure: FC<ProjectTableStructureProps> = ({ tableId }) => {
  const { t, translateColumnType } = useCustomTranslations();

  const apiRef = useGridApiRef();
  const [paging, setGridPaging] = useState<GridPagingParams>();
  const [items, setItems] = useState<TableColumnExtended[]>([]);

  const {
    tableColumns,
    isLoading,
    isFetched,
    handleDropColumn,
    handleAddColumn,
    handleEditColumn,
  } = useProjectTableStructure(tableId);

  const { getActions, onRowModesModelChange, rowModesModel } =
    useGetEditRowActions<TableColumnExtended>({
      apiRef,
    });

  useEffect(() => {
    setItems(tableColumns);
  }, [isFetched, tableColumns]);

  const changeTableColumn = useCallback(
    async (
      { displayName }: TableColumnExtended,
      oldRow: TableColumnExtended,
    ): Promise<TableColumnExtended> => {
      const isNameChanged = displayName !== oldRow.displayName;
      if (!isNameChanged) {
        return oldRow;
      }

      try {
        await handleEditColumn({ columnId: oldRow.id, newColumnName: displayName });
        notifySuccess(t('MESSAGE.UPDATE_SUCCESS'));
        return {
          ...oldRow,
          displayName,
        };
      } catch (e) {
        showErrorMessage(e, 'ERROR.UPDATE_FAILED');
        return oldRow;
      }
    },
    [handleEditColumn, t],
  );

  const validateColumnName = useCallback(
    (params: GridPreProcessEditCellProps<string, TableColumnExtended>) => {
      const existingNames = items
        ?.map(({ displayName }) => displayName)
        .filter(name => name !== params.row.displayName);

      const error = existingNames?.includes(params.props.value!)
        ? t('STRUCTURE.ERROR.NOT_UNIQUE_NAME')
        : undefined;

      return { ...params.props, error };
    },
    [items, t],
  );

  const structureTableColumns: EnhancedColDef<TableColumnExtended>[] = useMemo(
    () => [
      {
        field: 'displayName',
        headerName: t('COMMON.TITLE'),
        flex: 3,
        editable: true,
        preProcessEditCellProps: validateColumnName,
        renderEditCell(params) {
          return <StringEditingCell {...params} />;
        },
      },
      {
        field: 'type',
        headerName: t('STRUCTURE.TYPE'),
        flex: 3,
        valueFormatter: translateColumnType,
      },
      // TODO API, определить формат данных
      // {
      //   field: 'validValues',
      //   headerName: t('STRUCTURE.VALID_VALUES'),
      //   minWidth: 200,
      //   editable: true,
      //   flex: 1,
      // },
      {
        field: 'unique',
        headerName: t('STRUCTURE.UNIQUE_FIELD'),
        flex: 1,
        type: 'boolean',
      },
      {
        field: 'nullable',
        headerName: t('STRUCTURE.REQUIRED_FIELD'),
        flex: 1,
        type: 'boolean',
        valueGetter: v => !v,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 180,
        getActions: getActions(handleDropColumn),
      },
    ],
    [getActions, handleDropColumn, t, translateColumnType, validateColumnName],
  );

  const onRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.enterKeyDown) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleRowOrderChange = (params: GridRowOrderChangeParams) => {
    const newRows = reorderRows(params.oldIndex, params.targetIndex, items ?? []);
    setItems(newRows);
    // TODO: update column list
  };

  return (
    <DataGrid<TableColumnExtended>
      ref={apiRef}
      loading={isLoading}
      items={items ?? []}
      totalCount={items?.length ?? 0}
      isCellEditable={({ row }) => row.name !== 'id'}
      editMode={'row'}
      columns={structureTableColumns}
      processRowUpdate={changeTableColumn}
      rowModesModel={rowModesModel}
      onRowModesModelChange={onRowModesModelChange}
      onRowEditStop={onRowEditStop}
      paging={paging}
      onPagingChanged={setGridPaging}
      onRowOrderChange={handleRowOrderChange}
      rowReordering
      hasWidthSaving={false}
      customToolbarContent={
        <AddEntity customText={t('STRUCTURE.ADD_COLUMN')} onClick={handleAddColumn} />
      }
    />
  );
};
