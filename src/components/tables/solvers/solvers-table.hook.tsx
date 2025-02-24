import { confirmDeletionModal, modal, notifySuccess } from '@pspod/ui-components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateSolverMutation } from '~/api/queries/solvers/create-solver.mutation';
import { useDeleteSolverMutation } from '~/api/queries/solvers/delete-solver.mutation';
import { useUpdateSolverMutation } from '~/api/queries/solvers/update-solver.mutation';
import { Solver } from '~/api/utils/api-requests';
import { SolverForm } from '~/components/forms/solver/solver-form';
import { showErrorMessage } from '~/utils/show-error-message';

export const useSolverActions = (projectId: string) => {
  const { t } = useTranslation();

  //#region Queries & mutations

  const { mutate: createSolver } = useCreateSolverMutation(projectId, {
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });
  const { mutate: updateSolver } = useUpdateSolverMutation(projectId, {
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });
  const { mutateAsync: deleteSolver } = useDeleteSolverMutation(projectId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  //#endregion

  //#region callbacks

  const handleCreateSolver = useCallback(() => {
    modal({
      onOk: createSolver,
      title: t('ACTION.ADD', { type: t('ENTITY.SOLVER').toLowerCase() }),
      renderContent: args => <SolverForm projectId={projectId} {...args} />,
    });
  }, [projectId, createSolver, t]);

  const handleUpdateSolver = useCallback(
    (row: Solver) => {
      modal({
        onOk: (data: Solver) => updateSolver({ solverId: row.id!, ...data }),
        title: t('ACTION.EDIT', { type: t('ENTITY.SOLVER').toLowerCase() }),
        renderContent: args => <SolverForm isEditing projectId={projectId} {...args} data={row} />,
      });
    },
    [projectId, t, updateSolver],
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
