import { notifySuccess } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAddTableDataMutation } from '~/api/queries/tables/table-data/add-table-data.mutation';
import { useDeleteTableDataMutation } from '~/api/queries/tables/table-data/delete-table-data.mutation';
import { getTableContentQueryOptions } from '~/api/queries/tables/table-data/get-table-content.query';
import { getTableDataQueryOptions } from '~/api/queries/tables/table-data/get-table-data.query';
import { useUpdateTableDataMutation } from '~/api/queries/tables/table-data/update-table-data.mutation';
import { tableDataFormModal } from '~/components/forms/table-data/table-data-form.modal';
import { showErrorMessage } from '~/utils/show-error-message';

export type TableData = Record<string, any> & { id: string };

export const useProjectTable = (tableId: string) => {
  const { t } = useTranslation();

  const {
    data: content = [],
    isError: isContentError,
    isLoading: isContentLoading,
  } = useQuery(getTableContentQueryOptions(tableId));

  const { data: metadata = [], isLoading: isMetadataLoading } = useQuery(
    getTableDataQueryOptions(tableId, {
      select: data => data.columns,
    }),
  );

  const { mutateAsync: addTableColumn } = useAddTableDataMutation(tableId, {
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutateAsync: updateTableColumn } = useUpdateTableDataMutation(tableId, {
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

  const { mutate: deleteTableColumn } = useDeleteTableDataMutation(tableId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const addTableData = useCallback(() => {
    tableDataFormModal({
      title: t('ACTION.ADD', { type: t('COMMON.DATA').toLowerCase() }),
      tableContent: content,
      tableId,
      metadata,
      onSave: addTableColumn,
    });
  }, [t, content, metadata, addTableColumn, tableId]);

  const editTableData = useCallback(
    (data: TableData) => {
      tableDataFormModal({
        title: t('ACTION.EDIT', { type: t('COMMON.DATA').toLowerCase() }),
        tableContent: content,
        tableId,
        metadata,
        data,
        onSave: formData => updateTableColumn({ ...formData, id: data.id }),
      });
    },
    [t, content, metadata, updateTableColumn, tableId],
  );

  const tableColumnOrder = useMemo(() => (content?.[0] ? Object.keys(content[0]) : []), [content]);

  const sortedMetadataBasedOnView = useMemo(() => {
    return metadata.toSorted((a, b) => {
      return (
        tableColumnOrder.findIndex(v => v === a.displayName) -
        tableColumnOrder.findIndex(v => v === b.displayName)
      );
    });
  }, [tableColumnOrder, metadata]);

  return {
    metadata: sortedMetadataBasedOnView,
    content,
    isContentError,
    isLoading: isMetadataLoading || isContentLoading,
    addTableData,
    editTableData,
    deleteTableColumn,
  };
};
