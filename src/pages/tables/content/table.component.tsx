import { Edit as EditIcon } from '@mui/icons-material';
import { Alert, AlertTitle, Button } from '@mui/material';
import { GridActionsCellItem, GridActionsColDef, GridRowParams } from '@mui/x-data-grid-premium';
import {
  AddEntity,
  DataGrid,
  DeleteCellButton,
  EnhancedColDef,
  Preloader,
} from '@pspod/ui-components';
import { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ContentNode } from '~/api/utils/api-requests';
import { structurePath } from '~/utils/configuration/routes-paths';
import { getGridColumnType } from '~/utils/datagrid/get-col-type';

import { useTableData, TableData } from './use-table-data.hook';

interface TableProps {
  nodeInfo: ContentNode;
}

export const Table: FC<TableProps> = ({ nodeInfo }) => {
  const { t } = useTranslation();

  const {
    metadata,
    content,
    isLoading,
    isContentError,
    addTableData,
    editTableData,
    deleteTableColumn,
  } = useTableData(nodeInfo.id);

  const getActions = useCallback<GridActionsColDef<TableData>['getActions']>(
    ({ row }: GridRowParams<TableData>) => {
      const onEditClick = () => editTableData(row);
      const onDeleteClick = () => deleteTableColumn(row.id);
      return [
        <GridActionsCellItem
          key={'edit'}
          icon={<EditIcon />}
          title={t('STRUCTURE.EDIT_ROW')}
          label={t('STRUCTURE.EDIT_ROW')}
          onClick={onEditClick}
        />,
        <DeleteCellButton key={'delete'} deleteHandler={onDeleteClick} entity={t('COMMON.DATA')} />,
      ];
    },
    [deleteTableColumn, editTableData, t],
  );

  const columns = useMemo<EnhancedColDef[]>(() => {
    const cols =
      metadata.map<EnhancedColDef>(col => {
        const type = getGridColumnType(col.type);
        return {
          field: col.name,
          headerName: col.name,
          type,
          hideable: true,
        };
      }) ?? [];

    cols.push({
      field: 'actions',
      type: 'actions',
      width: 84,
      getActions,
    });

    return cols;
  }, [getActions, metadata]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!metadata.length || isContentError) {
    return (
      <Alert severity={'info'} color={'warning'} sx={{ width: 'fit-content' }}>
        <AlertTitle>{metadata.length ? t('STRUCTURE.NOT_SAVED') : t('STRUCTURE.EMPTY')}</AlertTitle>
        <Button variant={'outlined'} color={'primary'} component={Link} to={structurePath}>
          {t('ACTION.VIEW')}
        </Button>
      </Alert>
    );
  }

  return (
    <DataGrid
      items={content}
      totalCount={content?.length ?? 0}
      columns={columns}
      pinnedColumns={{ right: ['actions'] }}
      customToolbarContent={<AddEntity onClick={addTableData} />}
    />
  );
};
