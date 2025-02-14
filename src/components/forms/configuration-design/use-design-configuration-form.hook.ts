import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { useCreateApplicationFile } from '~/api/queries/design/create-application-file.mutation';
import { getColorPalettesQueryOptions } from '~/api/queries/design/get-color-palettes.query';
import { useUploadFile } from '~/use-cases/upload-file.hook';
import { showErrorMessage } from '~/utils/show-error-message';

export const useDesignConfigurationForm = () => {
  const { mutateAsync: createApplicationFile } = useCreateApplicationFile({
    onError: e => showErrorMessage(e, 'ERROR.UPLOAD_FAILED'),
  });

  const { handleUpload, isUploading } = useUploadFile();

  const { data: appColorsPalettes = [] } = useQuery(getColorPalettesQueryOptions());

  const getFileId = useCallback(
    (type: 'mainLogo' | 'loginLogo', originalName: string) => async () => {
      const { fileId } = await createApplicationFile({ type, originalName });
      return fileId;
    },
    [createApplicationFile],
  );

  const onAttachLogoFile = useCallback(
    async (file: File, field: string) => {
      const type = field.includes('main') ? 'mainLogo' : 'loginLogo';
      return handleUpload(getFileId(type, file.name), file);
    },
    [getFileId, handleUpload],
  );

  return { onAttachLogoFile, isUploading, appColorsPalettes };
};
