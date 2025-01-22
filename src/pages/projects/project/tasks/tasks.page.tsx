import EditIcon from '@mui/icons-material/Edit';
import { GridActionsCellItem, useGridApiRef } from '@mui/x-data-grid-premium';
import { AddEntity, DataGrid, EnhancedColDef } from '@pspod/ui-components';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useGetProjectTasksQuery } from '~/api/queries/projects/tasks/get-project-tasks.query';
import { FullTaskInfo, TaskState } from '~/api/utils/api-requests';
import { editPath } from '~/utils/configuration/routes-paths';
import { useCustomTranslations } from '~/utils/hooks/use-custom-translations';

const TasksList: FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const apiRef = useGridApiRef();
  const { translateStatus } = useCustomTranslations();

  const { data: taskList = [], isLoading: isTaskListLoading } = useGetProjectTasksQuery(
    projectId!,
    {
      enabled: !!projectId,
      select: data => {
        // TODO: remove this mock
        if (!data.length) {
          return dummyData;
        }
        return data;
      },
    },
  );

  const columns = useMemo<EnhancedColDef<FullTaskInfo>[]>(
    () => [
      {
        field: 'name',
        headerName: t('COMMON.TITLE'),
        width: 200,
      },
      {
        field: 'description',
        headerName: t('COMMON.DESCRIPTION'),
        width: 200,
      },
      {
        field: 'authorId',
        headerName: t('COMMON.AUTHOR'),
        width: 200,
        valueGetter: (_, row) => row.authorName,
        groupingValueGetter: (_, row) => row.authorName,
      },
      {
        field: 'priority',
        type: 'number',
        headerName: t('COMMON.PRIORITY'),
        width: 100,
      },
      {
        ...getStateColumn(translateStatus),
        headerName: t('COMMON.STATUS'),
        width: 150,
      },
      {
        field: 'created',
        type: 'dateTime',
        headerName: t('COMMON.DATE_CREATED'),
        width: 200,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions({ row }) {
          return [
            <GridActionsCellItem
              key={'edit'}
              label={t('ACTION.EDIT', { type: t('ENTITY.TASK').toLowerCase() })}
              title={t('ACTION.EDIT', { type: t('ENTITY.TASK').toLowerCase() })}
              icon={<EditIcon />}
              color={'primary'}
              component={Link}
              disabled
              // @ts-expect-error types
              to={`${row.id}/${editPath}`}
            />,
          ];
        },
      },
    ],
    [t, translateStatus],
  );

  return (
    <DataGrid
      ref={apiRef}
      items={taskList}
      totalCount={taskList.length ?? 0}
      columns={columns}
      loading={isTaskListLoading}
      pinnedColumns={{ right: ['actions'] }}
      customToolbarContent={<AddEntity onClick={() => navigate('#' /** addPath */)} />}
    />
  );
};

export default TasksList;

const dummyData: FullTaskInfo[] = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    authorId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    authorName: 'Test User',
    type: 'test-task',
    name: 'Test name',
    description: 'Test task description',
    priority: 3,
    state: TaskState.Created,
    created: '2024-12-31T18:00:00',
    parameters: {
      type: 'test-task',
    },
  },
];

function getStateColumn(translateStatus: (state: string) => string): EnhancedColDef {
  const valueOptions = Object.keys(TaskState).map(status => ({
    value: status,
    label: translateStatus(status),
  }));

  return {
    field: 'state',
    type: 'singleSelect',
    valueOptions,
    groupingValueGetter: translateStatus,
  };
}
