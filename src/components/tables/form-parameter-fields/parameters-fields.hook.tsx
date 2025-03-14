import { notifySuccess, modal } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateFormParameterMutation } from '~/api/queries/forms/parameters/create-form-parameter.mutation';
import { useDeleteFormParameterMutation } from '~/api/queries/forms/parameters/delete-form-parameter.mutation';
import { getFormParametersQueryOptions } from '~/api/queries/forms/parameters/get-parameters.query';
import { useUpdateFormParameterMutation } from '~/api/queries/forms/parameters/update-form-parameter.mutation';
import { sortParametersByIndex } from '~/api/selectors/sort-parameters-by-index';
import { ParameterField } from '~/api/utils/api-requests';
import { showErrorMessage } from '~/utils/show-error-message';

import { AddParameterForm } from '../../forms/parameter-field/add-parameter-field-form';
import { EditParameterForm } from '../../forms/parameter-field/edit-parameter-field-form';

export const useParametersHook = (formId: string) => {
  const { t } = useTranslation();
  const { data: parameters = [], isLoading } = useQuery(
    getFormParametersQueryOptions(formId, {
      enabled: !!formId,
      select: data =>
        sortParametersByIndex(data).map(param => {
          return { ...param, __reorder__: param.name };
        }),
    }),
  );

  const parameterKeys = parameters.map(param => param.key);

  const { mutate: deleteParameter } = useDeleteFormParameterMutation(formId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, t('ERROR.DELETION_FAILED')),
  });
  const { mutate: createParameter } = useCreateFormParameterMutation(formId, {
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, t('ERROR.CREATION_FAILED')),
  });
  const { mutateAsync: updateParameter } = useUpdateFormParameterMutation(formId, {
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, t('ERROR.UPDATE_FAILED')),
  });

  const handleCreateParameter = useCallback(() => {
    modal({
      onOk: createParameter,
      title: t('ACTION.ADD', { type: t('ENTITY.PARAMETER').toLowerCase() }),
      renderContent: args => <AddParameterForm {...args} parameterKeys={parameterKeys} />,
    });
  }, [createParameter, parameterKeys, t]);

  const handleUpdateParameter = useCallback(
    (row: ParameterField) => {
      modal({
        onOk: updateParameter,
        title: t('ACTION.EDIT', { type: t('ENTITY.PARAMETER').toLowerCase() }),
        renderContent: args => (
          <EditParameterForm {...args} data={row} parameterKeys={parameterKeys} />
        ),
      });
    },
    [parameterKeys, t, updateParameter],
  );

  const changeOrder = useCallback(
    async ({ targetIndex, oldIndex }: { targetIndex: number; oldIndex: number }) => {
      try {
        const parametersCopy = [...parameters];
        const moved = parametersCopy.splice(oldIndex, 1)[0];
        parametersCopy.splice(targetIndex, 0, { ...moved, __reorder__: moved.name });
        parametersCopy.forEach((item, index) => {
          item.index = index;
        });

        //Ищем все параметры с обновлённым индексом
        const updatedParameters = parametersCopy.filter(
          item => !parameters.find(param => param.id === item.id && param.index === item.index),
        );

        const promises = updatedParameters.map(item => updateParameter(item));

        await Promise.all(promises);
        notifySuccess(t('MESSAGE.UPDATE_SUCCESS'));
      } catch (err) {
        showErrorMessage(err, 'ERROR.UPDATE_FAILED');
      }
    },
    [parameters, t, updateParameter],
  );

  return {
    parameters,
    isLoading,
    deleteParameter,
    handleUpdateParameter,
    handleCreateParameter,
    changeOrder,
  };
};
