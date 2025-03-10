import {
  ArrowBack,
  DeleteOutline,
  Edit,
  FileDownloadRounded,
  PlayArrowRounded,
} from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { Button } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { getContentNodesByParentQueryOptions } from '~/api/queries/project-content/get-content-nodes-by-parent.query';
import { getProjectTaskQueryOptions } from '~/api/queries/projects/tasks/get-project-task.query';
import { getSolversQueryOptions } from '~/api/queries/solvers/get-solvers.query';
import { TaskState } from '~/api/utils/api-requests';
import { ButtonLink, TextLink } from '~/components/implicit-links';
import { SolverCardPopper } from '~/components/solver-card/solver-card.component';
import { SummaryTable, SummaryEntry } from '~/components/summary-table/summary-table.component';
import { useTaskActions } from '~/use-cases/task-actions.hook';
import { useCustomTranslations } from '~/utils/hooks';

export const Route = createFileRoute('/_main/projects/project/$projectId/tasks/$taskId')({
  component: TaskPage,
  loader: async ({ context, params: { taskId } }) => {
    const task = await context.queryClient.fetchQuery(getProjectTaskQueryOptions(taskId));
    context.title = task.name;
  },
});

function TaskPage() {
  const { t, translateStatus } = useCustomTranslations();

  const { projectId, taskId } = Route.useParams();
  const navigate = Route.useNavigate();

  const [shouldRefetch, setShouldRefetch] = useState(true);
  const { data: task, isRefetching } = useQuery(
    getProjectTaskQueryOptions(taskId, {
      refetchInterval: 2000,
      enabled: shouldRefetch,
    }),
  );

  const taskParams = task?.parameters.params;

  const { downloadTaskResults, handleEditTask, startTask, isTaskStarted, handleDeleteTask } =
    useTaskActions(projectId);

  useEffect(() => {
    const processStatuses = [TaskState.Created, TaskState.Queued, TaskState.InProgress];
    setShouldRefetch(
      (TaskState.ReadyToStart && isTaskStarted) || processStatuses.some(s => s === task?.state),
    );
  }, [isRefetching, isTaskStarted, task?.state]);

  const { data: solver } = useQuery(
    getSolversQueryOptions(projectId, {
      enabled: !!taskParams,
      select: data => data.find(s => s.id === taskParams?.solver),
    }),
  );
  const { data: tables } = useQuery(
    getContentNodesByParentQueryOptions(projectId, undefined, {
      enabled: !!taskParams,
      select: data => data.filter(({ id }) => taskParams?.contents?.includes(id)),
    }),
  );

  const taskInfo: SummaryEntry[] = [
    { title: t('COMMON.DESCRIPTION'), value: task?.description },
    { title: t('COMMON.PRIORITY'), value: task?.priority, type: 'number' },
    { title: t('COMMON.PROGRESS'), value: task?.progress, type: 'number' },
    { title: t('COMMON.DATE_CREATED'), value: task?.created, type: 'dateTime' },
    { title: t('COMMON.DATE_END'), value: task?.endDate, type: 'dateTime' },
    { title: t('COMMON.AUTHOR'), value: task?.authorName },
  ];

  const taskParamsInfo: SummaryEntry[] = [
    {
      title: t('ENTITY.SOLVER'),
      type: 'custom',
      value: (
        <SolverCardPopper
          projectId={projectId}
          solverId={solver?.id ?? ''}
          solverName={solver?.name ?? ''}
        />
      ),
    },
    {
      title: t('ENTITY.TABLES'),
      type: 'custom',
      value: tables?.length ? (
        <div>
          {tables.map((table, index) => (
            <TextLink
              key={table.id}
              underline={'hover'}
              to={'/projects/project/$projectId/tables/$tableId'}
              params={{ tableId: table.id, projectId }}
              marginRight={0.5}
            >
              {table.name}
              {index !== tables.length - 1 ? ',' : undefined}
            </TextLink>
          ))}
        </div>
      ) : null,
    },
    {
      title: t('FORM.MODELLING_TIME'),
      value: taskParams?.timeout,
      type: 'number',
    },
    ...Object.entries(taskParams ?? {}).reduce<SummaryEntry[]>((params, [label, value]) => {
      if (['solver', 'timeout', 'contents'].includes(label)) {
        return params;
      }

      return [...params, { title: label, value: value?.toString() }];
    }, [] as SummaryEntry[]),
  ];

  return (
    <>
      <Stack
        width={'100%'}
        position={'sticky'}
        top={0}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Stack direction={'row'} alignItems={'center'}>
          <ButtonLink to={'..'} variant={'text'} icon={<ArrowBack />} />
          <Typography variant={'h3'} gutterBottom={false} marginRight={theme => theme.spacing(1)}>
            {task?.name}
          </Typography>
          <Button
            variant={'text'}
            size={'small'}
            icon={<Edit />}
            color={'primary'}
            title={t('ACTION.EDIT', { type: t('ENTITY.TASK').toLowerCase() })}
            onClick={() => {
              handleEditTask(task!, () => setShouldRefetch(true));
            }}
          />
          <Button
            variant={'text'}
            size={'small'}
            color={'error'}
            icon={<DeleteOutline />}
            onClick={() => handleDeleteTask(task!.id, () => void navigate({ to: '..' }))}
          />
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography textAlign={'right'} gutterBottom={false}>
            <b>{t('COMMON.STATUS')}: </b>
            {translateStatus(task!.state)}
          </Typography>
          <Button
            variant={'text'}
            size={'small'}
            icon={<PlayArrowRounded />}
            disabled={task?.state !== TaskState.ReadyToStart}
            title={t('ACTION.RUN', { what: t('ENTITY.TASK').toLowerCase() })}
            onClick={() => startTask(task!.id)}
            isLoading={shouldRefetch}
          />
          <Button
            variant={'text'}
            size={'small'}
            icon={<FileDownloadRounded />}
            disabled={task?.state !== TaskState.Successed}
            title={t('ACTION.DOWNLOAD', { filename: t('ENTITY.TASK').toLowerCase() })}
            onClick={() => downloadTaskResults(task!.id)}
          />
        </Stack>
      </Stack>

      <Stack
        marginTop={4}
        minWidth={'500px'}
        width={'fit-content'}
        maxWidth={'900px'}
        marginInline={'auto'}
        gap={1}
      >
        <SummaryTable
          sx={{ width: '100%', 'th, td': { width: '50%' } }}
          data={taskInfo}
          alignTitle={'left'}
        />

        <Stack marginTop={2}>
          <Typography variant={'subtitle1'} paddingLeft={1}>
            {t('ENTITY.PARAMETERS')}
          </Typography>
          <SummaryTable
            sx={{ width: '100%', 'th, td': { width: '50%' } }}
            data={taskParamsInfo}
            alignTitle={'left'}
          />
        </Stack>
      </Stack>
    </>
  );
}
