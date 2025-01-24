import EditIcon from '@mui/icons-material/Edit';
import { useGridApiRef } from '@mui/x-data-grid-premium';
import { AddEntity, DataGrid, EnhancedColDef } from '@pspod/ui-components';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';

import { useGetProjectTasksQuery } from '~/api/queries/projects/tasks/get-project-tasks.query';
import { FullTaskInfo, TaskState } from '~/api/utils/api-requests';
import { GridActionsCellItemLink } from '~/components/implicit-links';
import { useCustomTranslations } from '~/utils/hooks/use-custom-translations';

export const Route = createFileRoute('/_main/projects/project/$projectId/tasks')({
  component: TasksList,
  staticData: {
    title: 'ENTITY.TASKS',
    order: 4,
  },
});

function TasksList() {
  const { projectId } = Route.useParams();
  const navigate = useNavigate();
  const apiRef = useGridApiRef();
  const { t, translateStatus } = useCustomTranslations();

  const { data: taskList = [], isLoading: isTaskListLoading } = useGetProjectTasksQuery(projectId, {
    enabled: !!projectId,
    select: data => {
      // TODO: remove this mock
      if (!data.length) {
        return dummyData;
      }
      return data;
    },
  });

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
        getActions() {
          return [
            <GridActionsCellItemLink
              key={'edit'}
              label={t('ACTION.EDIT', { type: t('ENTITY.TASK').toLowerCase() })}
              title={t('ACTION.EDIT', { type: t('ENTITY.TASK').toLowerCase() })}
              icon={<EditIcon />}
              color={'primary'}
              disabled
              to={Route.fullPath} // сменить роут, когда придет время
              params={{ projectId }}
            />,
          ];
        },
      },
    ],
    [projectId, t, translateStatus],
  );

  return (
    <DataGrid
      ref={apiRef}
      items={taskList}
      totalCount={taskList.length ?? 0}
      columns={columns}
      loading={isTaskListLoading}
      pinnedColumns={{ right: ['actions'] }}
      customToolbarContent={<AddEntity onClick={() => void navigate({ to: '.' /** addPath */ })} />}
    />
  );
}

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
