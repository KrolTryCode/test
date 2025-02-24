import { useCallback } from 'react';
import { UseFormResetField } from 'react-hook-form';

import { useCreateSolverFile } from '~/api/queries/solvers/create-solver-file.mutation';
import { Solver } from '~/api/utils/api-requests';
import { useGetSolverFile } from '~/use-cases/get-solver-file.hook';
import { useUploadFile } from '~/use-cases/upload-file.hook';
import { showErrorMessage } from '~/utils/show-error-message';

import { SolverUpdateRequest } from './solver-form.schema';

export const useSolverForm = (
  projectId: string,
  solver: Solver | undefined,
  isEditing: boolean,
  resetField: UseFormResetField<SolverUpdateRequest>,
) => {
  const { mutateAsync: createSolverFile } = useCreateSolverFile(projectId, solver?.id ?? '', {
    onError: e => showErrorMessage(e, 'ERROR.UPLOAD_FAILED'),
  });

  const { handleUpload, isUploading } = useUploadFile();

  const { file, isFetching, onDownloadFile } = useGetSolverFile(isEditing ? solver?.id : undefined);

  const getFileId = useCallback(
    (file: File) => async () => {
      const { fileId } = await createSolverFile(file);
      return fileId!;
    },
    [createSolverFile],
  );

  const onChangeFile = useCallback(
    async (file: File) => {
      if (file) {
        await handleUpload(getFileId(file), file);
        resetField('fileId');
      }
    },
    [getFileId, handleUpload, resetField],
  );

  return {
    file,
    onDownloadFile,
    onChangeFile,
    isUploadingFile: isFetching || isUploading,
  };
};
