import { modal, notifySuccess } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { useAddCheckMutation } from '~/api/queries/tables/checks/add-check.mutation';
import { useDeleteCheckMutation } from '~/api/queries/tables/checks/delete-check.mutation';
import { getTableDataQueryOptions } from '~/api/queries/tables/table-data/get-table-data.query';
import { DataType, Check } from '~/api/utils/api-requests';
import { CheckForm } from '~/components/forms/check/check-form.component';
import { showErrorMessage } from '~/utils/show-error-message';

const ALLOWED_TYPES = [DataType.Int, DataType.Float, DataType.String];

export const useChecks = (tableId: string) => {
  const { t } = useTranslation();

  const { data, isLoading } = useQuery(getTableDataQueryOptions(tableId));

  const checks = useMemo(() => data?.checks ?? [], [data]);
  const columns = useMemo(
    () => data?.columns.filter(column => ALLOWED_TYPES.includes(column.type)) ?? [],
    [data],
  );

  const { mutate: addCheck } = useAddCheckMutation(tableId, {
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutate: deleteCheck } = useDeleteCheckMutation(tableId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const handleAddCheck = useCallback(() => {
    modal({
      onOk: addCheck,
      title: t('ACTION.ADD', { type: t('ENTITY.CHECK').toLowerCase() }),
      renderContent: (args: InstanceProps<Check, never>) => (
        <CheckForm columns={columns} {...args} />
      ),
    });
  }, [addCheck, columns, t]);

  return { checks, isLoading, deleteCheck, handleAddCheck, tableColumns: columns };
};
