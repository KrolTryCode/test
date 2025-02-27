import { Circle, PanoramaFishEye } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid-premium';
import { GridPagingParams, notifySuccess } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getNotificationsListOptions } from '~/api/queries/notifications/get-notifications-list.query';
import { useMarkNotificationMutation } from '~/api/queries/notifications/mark-notification-checked.mutation';
import { selectNotifications } from '~/api/selectors/select-notifications';
import { Notification } from '~/api/utils/api-requests';
import { useServerPagingParams } from '~/utils/hooks';
import { showErrorMessage } from '~/utils/show-error-message';

export const useNotificationsTable = () => {
  const { t } = useTranslation();
  const [isOnlyUnreadShown, setIsOnlyUnreadShown] = useState(false);
  const [gridPaging, setGridPaging] = useState<GridPagingParams>();
  const serverPagingParams = useServerPagingParams(gridPaging);
  const [selectedRowsIds, setSelectedRowsIds] = useState<GridRowSelectionModel>([]);

  const { data: notifications, isLoading: isNotificationsLoading } = useQuery(
    getNotificationsListOptions(serverPagingParams, {
      select: res => selectNotifications(res, isOnlyUnreadShown),
    }),
  );

  const { mutate: markNotifications, isPending: isMutating } = useMarkNotificationMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

  const handleRowSelectionModelChange = useCallback((newModel: GridRowSelectionModel) => {
    setSelectedRowsIds(prevModel =>
      // без проверки бесконечное обновление со значением [] в дев-режиме
      JSON.stringify(prevModel) === JSON.stringify(newModel) ? prevModel : newModel,
    );
  }, []);

  const handleMarkRead = useCallback(
    (newStatus: boolean, ids: string[]) =>
      markNotifications({ isChecked: newStatus, notificationIds: ids }),
    [markNotifications],
  );

  const columns = useMemo<GridColDef<Notification>[]>(
    () => [
      {
        field: 'message',
        sortable: false,
        groupable: false,
        disableColumnMenu: true,
        headerName: t('COMMON.TEXT'),
        flex: 1,
        renderCell({ row: { isChecked, message, id = '' } }) {
          return (
            <Box
              flex={1}
              display={'flex'}
              alignItems={'center'}
              fontWeight={isChecked ? 'normal' : 'bold'}
              sx={{ '&:hover .readNotificationIcon': { visibility: 'visible' } }}
            >
              <IconButton
                size={'small'}
                color={'primary'}
                className={'readNotificationIcon'}
                onClick={() => handleMarkRead(!isChecked, [id])}
                sx={isChecked ? { visibility: 'hidden' } : {}}
              >
                {isChecked ? (
                  <PanoramaFishEye sx={{ fontSize: 12 }} />
                ) : (
                  <Circle sx={{ fontSize: 12 }} />
                )}
              </IconButton>
              <Box>{message}</Box>
            </Box>
          );
        },
      },
      {
        type: 'dateTime',
        field: 'created',
        headerName: t('COMMON.DATE'),
        width: 160,
      },
    ],
    [handleMarkRead, t],
  );

  return {
    columns,
    handleMarkRead,
    selectedRowsIds,
    isOnlyUnreadShown,
    paging: gridPaging,
    handleRowSelectionModelChange,
    onPagingChanged: setGridPaging,
    notifications: notifications?.content ?? [],
    totalCount: notifications?.totalElements ?? 0,
    isLoading: isNotificationsLoading || isMutating,
    toggleShowOnlyUnreadNotifications: () => setIsOnlyUnreadShown(!isOnlyUnreadShown),
  };
};
