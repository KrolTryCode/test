import { useCallback } from 'react';
import { UseFormResetField } from 'react-hook-form';

import { useGetFileQuery } from '~/api/queries/files/download-file.query';
import { useCreateSolverFile } from '~/api/queries/solvers/create-solver-file.mutation';
import { useGetSolverFileQuery } from '~/api/queries/solvers/get-solver-file.query';
import { Solver } from '~/api/utils/api-requests';
import { useUploadFile } from '~/components/upload-file/use-upload-file.hook';
import { SolverUpdateRequest } from '~/pages/_main/projects/project.$projectId/solvers/solver-form.component';
import { showErrorMessage } from '~/utils/show-error-message';

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

  const { data: solverFile, isFetching: isFetchingSolverFile } = useGetSolverFileQuery(
    solver?.id ?? '',
    { enabled: isEditing },
  );

  const { data: currentFile, isFetching: isFetchingFile } = useGetFileQuery(
    solverFile?.fileId ?? '',
    { enabled: !!solverFile?.fileId, params: { format: 'blob' } },
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
