import {
  ArrowBack,
  DeleteOutline,
  Edit,
  FileDownloadRounded,
  PlayArrowRounded,
} from '@mui/icons-material';
import { Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { Button } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { getContentNodesByParentQueryOptions } from '~/api/queries/project-content/get-content-nodes-by-parent.query';
import { getProjectTaskQueryOptions } from '~/api/queries/projects/tasks/get-project-task.query';
import { getSolversQueryOptions } from '~/api/queries/solvers/get-solvers.query';
import { TaskState } from '~/api/utils/api-requests';
import { ButtonLink } from '~/components/implicit-links';
import { SummaryTable, SummaryEntry } from '~/components/summary-table/summary-table.component';
import { useTaskActions } from '~/use-cases/task-actions.hook';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';
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
  const { TASKS } = useDeclinatedTranslationsContext();

  const { projectId, taskId } = Route.useParams();
  const navigate = Route.useNavigate();

  const [shouldRefetch, setShouldRefetch] = useState(true);
  const { data: task, isRefetching } = useQuery(
    getProjectTaskQueryOptions(taskId, {
      refetchInterval: 2000,
      enabled: shouldRefetch,
    }),
  );

  // @ts-expect-error type
  const taskParams = task?.parameters.params as {
    solver: string;
    contents: string;
    timeout: number;
  };

  const { downloadTaskResults, handleEditTask, startTask, isTaskStarted, archiveTask } =
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
  const { data: table } = useQuery(
    getContentNodesByParentQueryOptions(projectId, undefined, {
      enabled: !!taskParams,
      select: data => data.find(c => c.id === taskParams?.contents),
    }),
  );

  const taskInfo: SummaryEntry[] = [
    { title: t('COMMON.TITLE'), value: task?.name },
    { title: t('COMMON.DESCRIPTION'), value: task?.description },
    { title: t('COMMON.PRIORITY'), value: task?.priority, type: 'number' },
    { title: t('COMMON.PROGRESS'), value: task?.progress, type: 'number' },
    { title: t('COMMON.STATUS'), value: translateStatus(task?.state) },
    { title: t('COMMON.DATE_CREATED'), value: task?.created, type: 'dateTime' },
    { title: t('COMMON.DATE_END'), value: task?.endDate, type: 'dateTime' },
    { title: t('COMMON.AUTHOR'), value: task?.authorName },
  ];

  const taskParamsInfo: SummaryEntry[] = [
    {
      title: t('ENTITY.SOLVER'),
      value: solver?.name,
      type: 'link',
      to: {
        to: '/projects/project/$projectId/solvers/$solverId',
        params: { solverId: solver?.id, projectId },
      },
    },
    {
      title: t('ENTITY.TABLE'),
      value: table?.name,
      type: 'link',
      to: {
        to: '/projects/project/$projectId/tables/$tableId',
        params: { solverId: table?.id, projectId },
      },
    },
    {
      title: t('FORM.MODELLING_TIME'),
      value: taskParams?.timeout,
      type: 'number',
    },
  ];

  return (
    <Stack
      paddingTop={4}
      height={'100%'}
      minWidth={'500px'}
      width={'fit-content'}
      maxWidth={'900px'}
      marginInline={'auto'}
      gap={1}
    >
      <Card>
        <CardContent>
          <Stack direction={'row'} width={'100%'}>
            <ButtonLink
              to={'..'}
              variant={'text'}
              icon={<ArrowBack />}
              sx={{ marginRight: 'auto' }}
            >
              {`${t('PREPOSITION.K')} ${TASKS.DATIVE.toLowerCase()}`}
            </ButtonLink>
            <Button
              variant={'text'}
              size={'small'}
              icon={<PlayArrowRounded />}
              disabled={task?.state !== TaskState.ReadyToStart}
              title={t('ACTION.RUN', { what: t('ENTITY.TASK').toLowerCase() })}
              onClick={() => startTask(task!.id!)}
              isLoading={shouldRefetch}
            />
            <Button
              variant={'text'}
              size={'small'}
              icon={<FileDownloadRounded />}
              disabled={task?.state !== TaskState.Successed}
              title={t('ACTION.DOWNLOAD', { filename: t('ENTITY.TASK').toLowerCase() })}
              onClick={() => downloadTaskResults(task!.id!)}
            />
            <Button
              variant={'text'}
              size={'small'}
              icon={<Edit />}
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
              onClick={async () => {
                await archiveTask(task!.id!);
                await navigate({ to: '..' });
              }}
            />
          </Stack>

          <Divider sx={theme => ({ marginBlock: theme.spacing(1) })} />

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
        </CardContent>
      </Card>
    </Stack>
  );
}
