// src/api/queries/diagrams/elements/upload-element-file.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { diagramQueries } from '~/api/queries/diagrams/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ElementFile } from '~/api/utils/api-requests';

export const useUploadElementFileMutation = (
  diagramId: string,
  elementId: string,
  options?: UseCustomMutationOptions<ElementFile, unknown, File>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file) =>
      ApiClientSecured.diagramsV1Controller.createElementFile(diagramId, elementId, file),
    ...options,
    onSuccess(...args) {
      // Инвалидируем кеш файлов элементов диаграммы
      queryClient.invalidateQueries({ queryKey: ['diagram', 'elementFiles', diagramId] });
      options?.onSuccess?.(...args);
    },
  });
};
