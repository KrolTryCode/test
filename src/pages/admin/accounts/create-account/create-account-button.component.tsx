import CreateIcon from '@mui/icons-material/PersonAddAltOutlined';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '~/ui-components/button/button.component';

import { createAccountModal } from './create-account-form.component';

export const CreateAccountButton: FC = () => {
  const { t } = useTranslation();
  const openModal = () => createAccountModal({ title: t('ACCOUNT.CREATION_TITLE') });

  return (
    <Button icon={<CreateIcon />} color={'primary'} variant={'text'} onClick={openModal}>
      {t('ACTION.CREATE', { type: t('ENTITY.ACCOUNT').toLowerCase() })}
    </Button>
  );
};
