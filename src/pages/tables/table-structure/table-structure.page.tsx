import { Stack, Typography } from '@mui/material';
import {
  GridEventListener,
  GridRowEditStopReasons,
  GridRowOrderChangeParams,
  useGridApiRef,
} from '@mui/x-data-grid-premium';
import {
  notifySuccess,
  EnhancedColDef,
  GridPagingParams,
  AddEntity,
  useGetRowActions,
  Button,
} from '@pspod/ui-components';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { ColumnMetadataExtended } from '~/api/selectors/select-node-columns';
import { PairStringColumnType } from '~/api/utils/api-requests';
import { DataGrid } from '~/components/datagrid/datagrid.component';
import { useTableStructureActions } from '~/pages/tables/table-structure/use-table-structure-actions.hook';
import { useTableStructureData } from '~/pages/tables/table-structure/use-table-structure-data.hook';
import { projectPath, projectsPath, tablesPath } from '~/utils/configuration/routes-paths';
import { reorderRows } from '~/utils/datagrid/reorder-rows';
import { useCustomTranslations } from '~/utils/hooks/use-custom-translations';
import { showErrorMessage } from '~/utils/show-error-message';

const TableStructure: FC = () => {
  const apiRef = useGridApiRef();
  const { t } = useTranslation();

  const { translateColumnType } = useCustomTranslations();
  const { projectId = '', nodeId = '' } = useParams();

  const { nodeInfo, nodeColumns, isColumnsFetched, isDataLoading } = useTableStructureData(nodeId);

  const { handleDropColumn, handleAddColumn, handleEditColumn, addView, isAddingView } =
    useTableStructureActions(nodeId, nodeColumns);
  const { getActions, onRowModesModelChange, rowModesModel } =
    useGetRowActions<ColumnMetadataExtended>({
      apiRef,
      deleteHandler: (row: ColumnMetadataExtended) => handleDropColumn(row.name),
    });

  const [paging, setGridPaging] = useState<GridPagingParams>();
  const [items, setItems] = useState(nodeColumns);

  useEffect(() => {
    setItems(nodeColumns);
  }, [isColumnsFetched, nodeColumns]);

  const changeTableColumn = useCallback(
    async (
      { name }: ColumnMetadataExtended,
      oldRow: ColumnMetadataExtended,
    ): Promise<ColumnMetadataExtended> => {
      const isNameChanged = name !== oldRow.name;
      if (!isNameChanged) {
        return oldRow;
      }

      try {
        await handleEditColumn({ columnName: oldRow.name, newColumnName: name });
        notifySuccess(t('MESSAGE.UPDATE_SUCCESS'));
        return {
          ...oldRow,
          name: name,
        };
      } catch (e) {
        showErrorMessage(e, 'ERROR.UPDATE_FAILED');
        return oldRow;
      }
    },
    [handleEditColumn, t],
  );

  const structureTableColumns: EnhancedColDef<ColumnMetadataExtended>[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: t('COMMON.TITLE'),
        flex: 1,
        editable: true,
      },
      {
        field: 'type',
        headerName: t('STRUCTURE.TYPE'),
        flex: 1,
        type: 'singleSelect',
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
        field: 'isPrimaryKey',
        headerName: t('STRUCTURE.UNIQUE_FIELD'),
        width: 150,
        type: 'boolean',
      },
      {
        field: 'requiredField',
        headerName: t('STRUCTURE.REQUIRED_FIELD'),
        width: 150,
        type: 'boolean',
      },
      {
        field: 'actions',
        type: 'actions',
        width: 84,
        getActions,
      },
    ],
    [getActions, t, translateColumnType],
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

  const handleAddView = () => {
    if (items) {
      const view = items.map<PairStringColumnType>(v => ({ first: v.name, second: v.type }));
      addView(view);
    }
  };

  return (
    <Stack height={'100%'} gap={1}>
      <Typography variant={'h3'} color={'primary'}>
        {`${t('STRUCTURE.LIST')} ${nodeInfo?.name}`}
      </Typography>

      <DataGrid<ColumnMetadataExtended>
        ref={apiRef}
        loading={isDataLoading || isAddingView}
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
        customToolbarContent={<AddEntity onClick={handleAddColumn} />}
      />

      <Stack direction={'row'} gap={1} alignSelf={'flex-end'}>
        <Button
          variant={'outlined'}
          color={'primary'}
          component={Link}
          to={`/${projectsPath}/${projectPath}/${projectId}/${tablesPath}/${nodeId}`}
        >
          {t('ACTION.CANCEL')}
        </Button>
        <Button
          variant={'contained'}
          color={'primary'}
          onClick={handleAddView}
          isLoading={isAddingView}
        >
          {t('ACTION.SAVE')}
        </Button>
      </Stack>
    </Stack>
  );
};

export default TableStructure;
