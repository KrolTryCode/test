import { Edit as EditIcon } from '@mui/icons-material';
import { Alert, AlertTitle } from '@mui/material';
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

import { ButtonLink } from '~/components/implicit-links';
import { getGridColumnType } from '~/utils/datagrid/get-col-type';

import { useProjectTable, TableData } from './project-table.hook';

interface ProjectTableProps {
  tableId: string;
  projectId: string;
}

export const ProjectTable: FC<ProjectTableProps> = ({ projectId, tableId }) => {
  const { t } = useTranslation();

  const {
    metadata,
    content,
    isLoading,
    isContentError,
    addTableData,
    editTableData,
    deleteTableColumn,
  } = useProjectTable(tableId);

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
          field: col.id,
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
        <ButtonLink
          variant={'outlined'}
          color={'primary'}
          to={'/projects/project/$projectId/tables/$tableId/structure'}
          params={{ tableId, projectId }}
        >
          {t('ACTION.GO')}
        </ButtonLink>
      </Alert>
    );
  }

  return (
    <DataGrid
      items={content}
      totalCount={content?.length ?? 0}
      columns={columns}
      pinnedColumns={{ right: ['actions'] }}
      customToolbarContent={
        <AddEntity
          customText={t('ACTION.ADD', { type: t('COMMON.DATA').toLowerCase() })}
          onClick={addTableData}
        />
      }
    />
  );
};
