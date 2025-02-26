import { useCallback } from 'react';

import { useCreateSolverFile } from '~/api/queries/solvers/create-solver-file.mutation';
import { useUploadFile } from '~/use-cases/upload-file.hook';
import { showErrorMessage } from '~/utils/show-error-message';

export const useUploadSolverFile = (projectId: string) => {
  const { mutateAsync: createSolverFile } = useCreateSolverFile(projectId, {
    onError: e => showErrorMessage(e, 'ERROR.UPLOAD_FAILED'),
  });

  const { handleUpload, isUploading } = useUploadFile();

  const getFileId = useCallback(
    (solverId: string, file: File) => async () => {
      const { fileId } = await createSolverFile({ solverId, file });
      return fileId!;
    },
    [createSolverFile],
  );

  const onUploadFile = useCallback(
    (solverId: string, file: File) => handleUpload(getFileId(solverId, file), file),
    [getFileId, handleUpload],
  );

  return {
    onUploadFile,
    isUploadingFile: isUploading,
  };
};
