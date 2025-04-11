import { useCallback } from 'react';

import { useUploadElementFileMutation } from '~/api/queries/diagrams/elements/create-element-file.mutation';
import { useUploadFile } from '~/use-cases/upload-file.hook';
import { showErrorMessage } from '~/utils/show-error-message';

export const useUploadElementFile = (diagramId: string) => {
  const { mutateAsync: uploadElementFile } = useUploadElementFileMutation(diagramId, {
    onError: e => showErrorMessage(e, 'ERROR.UPLOAD_FAILED'),
  });

  const { handleUpload, isUploading } = useUploadFile();

  const getFileId = useCallback(
    (elementId: string, file: File) => async () => {
      const { fileId } = await uploadElementFile({ elementId, file });
      return fileId!;
    },
    [uploadElementFile],
  );

  const onUploadFile = useCallback(
    (elementId: string, file: File) => handleUpload(getFileId(elementId, file), file),
    [getFileId, handleUpload],
  );

  return {
    onUploadFile,
    isUploadingFile: isUploading,
  };
};
