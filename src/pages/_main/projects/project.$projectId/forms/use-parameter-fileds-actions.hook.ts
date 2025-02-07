import { notifySuccess } from '@pspod/ui-components';
import { useTranslation } from 'react-i18next';

import { useCreateFormParameterMutation } from '~/api/queries/forms/parameters/create-form-parameter.mutation';
import { useDeleteFormParameterMutation } from '~/api/queries/forms/parameters/delete-form-parameter.mutation';
import { useUpdateFormParameterMutation } from '~/api/queries/forms/parameters/update-form-parameter.mutation';
import { showErrorMessage } from '~/utils/show-error-message';

export const useParameterFieldsActions = (formId: string) => {
  const { t } = useTranslation();

  const { mutate: deleteParameter } = useDeleteFormParameterMutation(formId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });
  const { mutate: createParameter } = useCreateFormParameterMutation(formId, {
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });
  const { mutate: updateParameter } = useUpdateFormParameterMutation(formId, {
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });
  return { deleteParameter, createParameter, updateParameter };
};
