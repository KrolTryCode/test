import { Upload, Edit as EditIcon, Download, DeleteOutline } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import { AddEntity, Button, DataGrid, EnhancedColDef } from '@pspod/ui-components';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Solver } from '~/api/mocks/solvers/types';
import { useGetSolversQuery } from '~/api/queries/solvers/get-solvers.query';
import { useSolverActions } from '~/pages/projects/project/solvers/use-solver-actions.hook';
import { getColDateWithTz } from '~/utils/datagrid/get-col-date-with-tz';

const SolversList: FC = () => {
  const { projectId = '' } = useParams();
  const { t } = useTranslation();
  const {
    handleCreateSolver,
    handleDeleteSolver,
    handleUpdateSolver,
    handleImportSolver,
    handleExportSolver,
  } = useSolverActions(projectId);

  const { data = [] } = useGetSolversQuery(projectId);

  const columns = useMemo<EnhancedColDef<Solver>[]>(
    () => [
      {
        field: 'name',
        headerName: t('COMMON.TITLE'),
        flex: 1,
      },
      {
        field: 'description',
        headerName: t('COMMON.DESCRIPTION'),
        flex: 1,
      },
      {
        field: 'authorId',
        headerName: t('COMMON.AUTHOR'),
        flex: 1,
        valueGetter: (_, row) => row.author,
        groupingValueGetter: (_, row) => row.author,
      },
      {
        field: 'created',
        type: 'dateTime',
        headerName: t('COMMON.DATE_CREATED'),
        flex: 1,
        valueGetter: getColDateWithTz,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions({ row }) {
          return [
            <GridActionsCellItem
              key={'edit'}
              label={t('ACTION.EDIT', { type: t('ENTITY.SOLVER').toLowerCase() })}
              title={t('ACTION.EDIT', { type: t('ENTITY.SOLVER').toLowerCase() })}
              icon={<EditIcon />}
              color={'primary'}
              onClick={() => handleUpdateSolver(row)}
            />,
            <GridActionsCellItem
              key={'delete'}
              label={t('ACTION.DELETE', { type: t('ENTITY.SOLVER').toLowerCase() })}
              title={t('ACTION.DELETE', { type: t('ENTITY.SOLVER').toLowerCase() })}
              icon={<DeleteOutline />}
              color={'error'}
              onClick={() => handleDeleteSolver(row.id)}
            />,
          ];
        },
      },
    ],
    [handleDeleteSolver, handleUpdateSolver, t],
  );

  const ToolbarContent = (
    <>
      <AddEntity onClick={handleCreateSolver} />
      <Button
        disabled
        size={'small'}
        color={'primary'}
        title={t('ACTION.IMPORT', { what: t('ENTITY.SOLVER').toLowerCase() })}
        onClick={handleImportSolver}
        variant={'text'}
        icon={<Upload />}
      >
        <Typography sx={{ fontSize: 14, marginBottom: 0 }}>{t('ACTION.IMPORT')}</Typography>
      </Button>
      <Button
        disabled
        size={'small'}
        color={'primary'}
        title={t('ACTION.EXPORT', { what: t('ENTITY.SOLVER').toLowerCase() })}
        onClick={handleExportSolver}
        variant={'text'}
        icon={<Download />}
      >
        <Typography sx={{ fontSize: 14, marginBottom: 0 }}>{t('ACTION.EXPORT')}</Typography>
      </Button>
    </>
  );

  return (
    <DataGrid
      items={data}
      totalCount={data.length ?? 0}
      columns={columns}
      loading={false}
      pinnedColumns={{ right: ['actions'] }}
      customToolbarContent={ToolbarContent}
    />
  );
};

export default SolversList;
