import { modal, notifySuccess } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { useAddFormCheckMutation } from '~/api/queries/forms/checks/add-form-check.mutation';
import { useDeleteFormCheckMutation } from '~/api/queries/forms/checks/delete-form-check.mutation';
import { getFormChecksQueryOptions } from '~/api/queries/forms/checks/get-form-checks.query';
import { getFormParametersQueryOptions } from '~/api/queries/forms/parameters/get-parameters.query';
import { Check } from '~/api/utils/api-requests';
import { ALLOWED_TYPES } from '~/components/checks/checks.utils';
import { ParameterCheckForm } from '~/components/forms/check/parameter-check/parameter-check-form.component';
import { showErrorMessage } from '~/utils/show-error-message';

export const useParameterChecks = (formId: string, fieldId: string) => {
  const { t } = useTranslation();

  const { data: checks = [], isLoading: isChecksLoading } = useQuery(
    getFormChecksQueryOptions(formId, fieldId),
  );
  const { data: parameters = [], isLoading: isParametersLoading } = useQuery(
    getFormParametersQueryOptions(formId, {
      select: data => data.filter(f => ALLOWED_TYPES.includes(f.type)),
    }),
  );

  const leftValue = parameters.find(param => param.id === fieldId)!;

  const { mutate: addCheck } = useAddFormCheckMutation(formId, fieldId, {
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutate: deleteCheck } = useDeleteFormCheckMutation(formId, fieldId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const handleAddCheck = useCallback(() => {
    modal({
      onOk: addCheck,
      title: t('ACTION.ADD', { type: t('ENTITY.CHECK').toLowerCase() }),
      renderContent: (args: InstanceProps<Check, never>) => (
        <ParameterCheckForm parameters={parameters} leftValue={leftValue} {...args} />
      ),
    });
  }, [addCheck, leftValue, parameters, t]);

  return {
    checks,
    isLoading: isChecksLoading || isParametersLoading,
    deleteCheck,
    handleAddCheck,
    parameters,
  };
};
