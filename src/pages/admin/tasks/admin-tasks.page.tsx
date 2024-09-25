import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetActiveTasksQuery } from '~/api/queries/tasks/get-active-tasks.query';
import { useStopTaskMutation } from '~/api/queries/tasks/stop-task.mutation';
import { FullTaskInfo } from '~/api/utils/api-requests';
import { DataGrid } from '~/ui-components/datagrid/datagrid.component';
import { EnhancedColDef } from '~/ui-components/datagrid/datagrid.types';
import { notifySuccess } from '~/ui-components/notifications/notifications';
import { showErrorMessage } from '~/utils/show-error-message';
import { translateStatus } from '~/utils/translate-status';

const AdminAllTasks = () => {
  const { t } = useTranslation();

  const { data: projectTasks, isLoading } = useGetActiveTasksQuery();

  const { mutate: stopTask } = useStopTaskMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.STOP_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.STOP_FAILED'),
  });

  const columns = useMemo<EnhancedColDef<FullTaskInfo>[]>(
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
        field: 'authorName',
        headerName: t('COMMON.AUTHOR'),
        flex: 1,
      },
      {
        field: 'state',
        headerName: t('COMMON.STATUS'),
        valueFormatter(value) {
          return translateStatus(value);
        },
      },
      {
        field: 'actions',
        type: 'actions',
        disableReorder: true,
        getActions({ row: { id } }) {
          return [
            <GridActionsCellItem
              key={'stop'}
              showInMenu={true}
              label={t('ACTION.STOP')}
              onClick={() => stopTask({ taskId: id! })}
            />,
          ];
        },
      },
    ],
    [stopTask, t],
  );

  return (
    <DataGrid<FullTaskInfo>
      loading={isLoading}
      items={projectTasks ?? []}
      totalCount={projectTasks?.length ?? 0}
      columns={columns}
      hasToolbarFilters
    />
  );
};

export default AdminAllTasks;
