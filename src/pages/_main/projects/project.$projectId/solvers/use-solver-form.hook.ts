import { notifySuccess } from '@pspod/ui-components';
import { UseFormResetField } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetFileQuery } from '~/api/queries/files/download-file.query';
import { useUploadFileMutation } from '~/api/queries/files/upload-file.mutation';
import { useCreateSolverFile } from '~/api/queries/solvers/create-solver-file.mutation';
import { useGetSolverFileQuery } from '~/api/queries/solvers/get-solver-file.query';
import { Solver } from '~/api/utils/api-requests';
import { SolverUpdateRequest } from '~/pages/_main/projects/project.$projectId/solvers/solver-form.component';
import { showErrorMessage } from '~/utils/show-error-message';

export const useSolverForm = (
  projectId: string,
  solver: Solver | undefined,
  isEditing: boolean,
  resetField: UseFormResetField<SolverUpdateRequest>,
) => {
  const { t } = useTranslation();

  const { mutateAsync: createSolverFile } = useCreateSolverFile(projectId, solver?.id ?? '', {
    onError: e => showErrorMessage(e, 'ERROR.UPLOAD_FAILED'),
  });

  const { mutateAsync: uploadFile } = useUploadFileMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.UPLOAD_SUCCESS')),
    onError: e => {
      showErrorMessage(e, 'ERROR.UPLOAD_FAILED');
      resetField('fileId');
    },
  });

  const { data: solverFile, isFetching: isFetchingSolverFile } = useGetSolverFileQuery(
    solver?.id ?? '',
    { enabled: isEditing },
  );

  const { data: currentFile, isFetching: isFetchingFile } = useGetFileQuery(
    solverFile?.fileId ?? '',
    { enabled: !!solverFile?.fileId, params: { format: 'blob' } },
  );

  return {
    solverFile,
    currentFile,
    uploadFile,
    createSolverFile,
    isFetching: isFetchingSolverFile || isFetchingFile,
  };
};
