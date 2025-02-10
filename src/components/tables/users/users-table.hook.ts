import { GridPagingParams } from '@pspod/ui-components';
import { useState } from 'react';

import { useGetUserListQuery } from '~/api/queries/users/get-user-list.query';
import { selectPageableData } from '~/api/selectors/pageable';
import { useServerPagingParams } from '~/utils/hooks/use-server-options';

export const useUsersTable = () => {
  const [gridPaging, setGridPaging] = useState<GridPagingParams>();
  const serverPagingParams = useServerPagingParams(gridPaging);
  const { data: usersList, isLoading } = useGetUserListQuery(serverPagingParams, {
    select: selectPageableData,
  });

  return {
    loading: isLoading,
    items: usersList?.items ?? [],
    totalCount: usersList?.totalCount ?? 0,
    paging: gridPaging,
    onPagingChanged: setGridPaging,
  };
};
