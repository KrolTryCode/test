import { notifySuccess } from '@pspod/ui-components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useApproveAccountMutation } from '~/api/queries/accounts/approve-account.mutation';
import { useDeclineAccountMutation } from '~/api/queries/accounts/decline-account.mutation';
import { useStartAccountReactivationMutation } from '~/api/queries/accounts/reactivate-account.mutation';
import { useRemoveUserFromAdminsMutation } from '~/api/queries/accounts/remove-admin.mutation';
import { useSetUserAsAdminMutation } from '~/api/queries/accounts/set-admin.mutation';
import { useUpdateAccountMutation } from '~/api/queries/accounts/update-account.mutation';
import { useArchiveUserMutation } from '~/api/queries/users/archive-user.mutation';
import { useCreateUserMutation } from '~/api/queries/users/create-user.mutation';
import { User, AccountState } from '~/api/utils/api-requests';
import { showErrorMessage } from '~/utils/show-error-message';

export function useManageUser() {
  const { t } = useTranslation();

  const { mutateAsync: startReactivation } = useStartAccountReactivationMutation({
    onSuccess: () => notifySuccess(t('ACCOUNT.REACTIVATION.CODE_SENT')),
    onError: e => showErrorMessage(e, t('ACCOUNT.REACTIVATION.ERROR')),
  });

  const { mutateAsync: approveAccount } = useApproveAccountMutation({
    onSuccess: () => notifySuccess(t('ACCOUNT.REGISTRATION.APPROVE')),
    onError: e => showErrorMessage(e, 'ERROR.APPROVE_FAILED'),
  });

  const { mutateAsync: declineAccount } = useDeclineAccountMutation({
    onSuccess: () => notifySuccess(t('ACCOUNT.REGISTRATION.DECLINE')),
    onError: e => showErrorMessage(e, 'ERROR.DECLINE_FAILED'),
  });

  const { mutateAsync: updateAccount } = useUpdateAccountMutation();

  const modifyAccount = async (userId: string, state: AccountState) => {
    await updateAccount(
      { userId, state },
      {
        onSuccess: () => notifySuccess(t(`ACCOUNT.${state.toLocaleUpperCase()}.SUCCESS`)),
        onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
      },
    );
  };

  const { mutate: createAccount } = useCreateUserMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutateAsync: deleteAccount } = useArchiveUserMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const { mutateAsync: setUserAsAdmin } = useSetUserAsAdminMutation();
  const { mutateAsync: removeUserFromAdmins } = useRemoveUserFromAdminsMutation();

  const updateUserRow = useCallback(
    async (newRow: User, oldRow: User): Promise<User> => {
      if (newRow.admin === oldRow.admin) {
        return oldRow;
      }

      try {
        const mutationFn = oldRow.admin ? removeUserFromAdmins : setUserAsAdmin;
        await mutationFn(oldRow.id!);
        notifySuccess(t('MESSAGE.UPDATE_SUCCESS'));
        return newRow;
      } catch (e) {
        showErrorMessage(e, 'ERROR.UPDATE_FAILED');
        return oldRow;
      }
    },
    [removeUserFromAdmins, setUserAsAdmin, t],
  );

  return {
    startReactivation,
    modifyAccount,
    approveAccount,
    declineAccount,
    updateUserRow,
    deleteAccount,
    createAccount,
  };
}
