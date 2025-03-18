import { modal, notifySuccess } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { useAddTableCheckMutation } from '~/api/queries/tables/checks/add-table-check.mutation';
import { useDeleteTableCheckMutation } from '~/api/queries/tables/checks/delete-table-check.mutation';
import { getTableDataQueryOptions } from '~/api/queries/tables/table-data/get-table-data.query';
import { Check } from '~/api/utils/api-requests';
import { ALLOWED_TYPES } from '~/components/checks/checks.utils';
import { TableCheckForm } from '~/components/forms/check/table-check/table-check-form.component';
import { showErrorMessage } from '~/utils/show-error-message';

export const useTableChecks = (tableId: string) => {
  const { t } = useTranslation();

  const { data, isLoading } = useQuery(getTableDataQueryOptions(tableId));

  const checks = useMemo(() => data?.checks ?? [], [data]);
  const tableColumns = useMemo(
    () => data?.columns.filter(column => ALLOWED_TYPES.includes(column.type)) ?? [],
    [data],
  );

  const { mutate: addCheck } = useAddTableCheckMutation(tableId, {
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutate: deleteCheck } = useDeleteTableCheckMutation(tableId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const handleAddCheck = useCallback(() => {
    modal({
      onOk: addCheck,
      title: t('ACTION.ADD', { type: t('ENTITY.CHECK').toLowerCase() }),
      renderContent: (args: InstanceProps<Check, never>) => (
        <TableCheckForm columns={tableColumns} {...args} />
      ),
    });
  }, [addCheck, tableColumns, t]);

  return { checks, isLoading, deleteCheck, handleAddCheck, tableColumns };
};
