import { notifySuccess } from '@pspod/ui-components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useArchiveTokenMutation } from '~/api/queries/token/archive-token.mutation';
import { useGenerateTokenMutation } from '~/api/queries/token/generate-token.mutation';
import { useGetNodeTokensQuery } from '~/api/queries/token/get-project-node-tokens.query';
import { generateTokenModal } from '~/components/forms/token/token-form';
import { showErrorMessage } from '~/utils/show-error-message';

import { showTokenModal } from './show-token.modal';

export const useServiceTokensTable = (nodeId: string) => {
  const { t } = useTranslation();

  const { data: tokens = [], isLoading: isTokenListLoading } = useGetNodeTokensQuery(nodeId);
  const { mutate: archiveToken } = useArchiveTokenMutation(nodeId, {
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
  });
  const { mutate: generateToken } = useGenerateTokenMutation(nodeId, {
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
    onSuccess: value => {
      notifySuccess(t('MESSAGE.TOKEN_GENERATION_SUCCESS'));
      showTokenModal({
        value,
        title: t('TOKEN.VALUE'),
        buttonText: t('ACTION.COPY'),
        modalText: t('TOKEN.MODAL_WARNING'),
        onHandleCopy: () => notifySuccess(t('MESSAGE.TOKEN_COPIED_SUCCESS')),
      });
    },
  });

  const handleGenerateToken = useCallback(() => {
    generateTokenModal({
      title: t('ACTION.GENERATE_TOKEN'),
      onSave: data =>
        generateToken({ ...data, expirationDate: data.expirationDate!.toISOString() }),
    });
  }, [generateToken, t]);

  return { tokens, isTokenListLoading, archiveToken, handleGenerateToken };
};
