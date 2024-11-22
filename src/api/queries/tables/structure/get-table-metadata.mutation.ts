import { useMutation } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { TableMetadata } from '~/api/utils/api-requests';

//Переписана на мутацию в связи с необходимостью определять nodeId при вызове в use-nav-tree-actions.hook.ts
export const useGetTableMetadataColumns = (
  options?: UseCustomMutationOptions<TableMetadata, unknown, string>,
) => {
  return useMutation({
    mutationFn: async nodeId =>
      await ApiClientSecured.contentNodeV1Controller.getTableMetadata(nodeId, { withId: true }),
    ...options,
  });
};
