import CreateIcon from '@mui/icons-material/PersonAddAltOutlined';
import { Button, notifySuccess } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateUserMutation } from '~/api/queries/users/create-user.mutation';
import { createAccountModal } from '~/components/forms/create-account/create-account-form.modal';
import { showErrorMessage } from '~/utils/show-error-message';

export const CreateAccountButton: FC = () => {
  const { t } = useTranslation();

  const createUserMutation = useCreateUserMutation({
    onSuccess() {
      notifySuccess(t('MESSAGE.CREATION_SUCCESS'));
    },
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const openModal = () =>
    createAccountModal({
      title: t('ACTION.CREATE', { type: t('ENTITY.ACCOUNT').toLowerCase() }),
      onSave: createUserMutation.mutate,
    });

  return (
    <Button icon={<CreateIcon />} color={'primary'} variant={'text'} onClick={openModal}>
      {t('ACTION.CREATE', { type: t('ENTITY.ACCOUNT').toLowerCase() })}
    </Button>
  );
};
