import { confirmDeletionModal, modal, notifySuccess } from '@pspod/ui-components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateSolverMutation } from '~/api/queries/solvers/create-solver.mutation';
import { useDeleteSolverMutation } from '~/api/queries/solvers/delete-solver.mutation';
import { useUpdateSolverMutation } from '~/api/queries/solvers/update-solver.mutation';
import { Solver } from '~/api/utils/api-requests';
import { SolverForm } from '~/components/forms/solver/solver-form';
import { ISolverForm } from '~/components/forms/solver/solver-form.schema';
import { useUploadSolverFile } from '~/use-cases/upload-solver-file.hook';
import { showErrorMessage } from '~/utils/show-error-message';

export const useSolverActions = (projectId: string) => {
  const { t } = useTranslation();

  const { onUploadFile } = useUploadSolverFile(projectId);

  //#region Queries & mutations

  const { mutateAsync: createSolver } = useCreateSolverMutation(projectId, {
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });
  const { mutateAsync: updateSolver } = useUpdateSolverMutation(projectId, {
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });
  const { mutateAsync: deleteSolver } = useDeleteSolverMutation(projectId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  //#endregion

  //#region callbacks

  const createSolverWithFile = useCallback(
    async (solver: ISolverForm) => {
      const createdSolver = await createSolver(solver);
      const file = solver.file?.file;
      if (file) {
        await onUploadFile(createdSolver.id!, file);
      }
    },
    [createSolver, onUploadFile],
  );

  const updateSolverWithFile = useCallback(
    async (solver: ISolverForm) => {
      const updatedSolver = await updateSolver({ ...solver, id: solver.id! });
      const file = solver.file?.file;
      if (file) {
        await onUploadFile(updatedSolver.id!, file);
      }
    },
    [updateSolver, onUploadFile],
  );

  const handleCreateSolver = useCallback(() => {
    modal({
      onOk: createSolverWithFile,
      title: t('ACTION.ADD', { type: t('ENTITY.SOLVER').toLowerCase() }),
      renderContent: args => <SolverForm projectId={projectId} {...args} />,
    });
  }, [createSolverWithFile, projectId, t]);

  const handleUpdateSolver = useCallback(
    (solver: Solver) => {
      modal({
        onOk: updateSolverWithFile,
        title: t('ACTION.EDIT', { type: t('ENTITY.SOLVER').toLowerCase() }),
        renderContent: args => <SolverForm projectId={projectId} {...args} data={solver} />,
      });
    },
    [updateSolverWithFile, projectId, t],
  );

  const handleDeleteSolver = useCallback(
    (id: string, onOk?: () => void) => {
      confirmDeletionModal({
        title: t('ACTION.DELETE', { type: t('ENTITY.SOLVER').toLowerCase() }),
        onOk: () => void deleteSolver(id).then(onOk),
      });
    },
    [deleteSolver, t],
  );

  const handleImportSolver = useCallback(() => alert('Импорт будет'), []);
  const handleExportSolver = useCallback(() => alert('Экспорт будет'), []);

  //#endregion

  return {
    handleCreateSolver,
    handleUpdateSolver,
    handleDeleteSolver,
    handleImportSolver,
    handleExportSolver,
  };
};
