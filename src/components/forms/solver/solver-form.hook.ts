import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { UseFormResetField } from 'react-hook-form';

import { getFileQueryOptions } from '~/api/queries/files/download-file.query';
import { useCreateSolverFile } from '~/api/queries/solvers/create-solver-file.mutation';
import { getSolverFileQueryOptions } from '~/api/queries/solvers/get-solver-file.query';
import { Solver } from '~/api/utils/api-requests';
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

  const { data: solverFile, isFetching: isFetchingSolverFile } = useQuery(
    getSolverFileQueryOptions(solver?.id ?? '', { enabled: isEditing }),
  );

  const { data: currentFile, isFetching: isFetchingFile } = useQuery(
    getFileQueryOptions(solverFile?.fileId ?? '', {
      enabled: !!solverFile?.fileId,
      params: { format: 'blob' },
    }),
  );

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
    solverFile,
    currentFile,
    onChangeFile,
    isUploadingFile: isFetchingSolverFile || isFetchingFile || isUploading,
  };
};
