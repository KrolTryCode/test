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

export const useProjectTable = (nodeId: string) => {
  const { t } = useTranslation();

  const {
    data: content = [],
    isError: isContentError,
    isLoading: isContentLoading,
  } = useQuery(getTableContentQueryOptions(nodeId));

  const { data: metadata = [], isLoading: isMetadataLoading } = useQuery(
    getTableDataQueryOptions(nodeId, {
      select: data => data.columns,
    }),
  );

  const { mutate: addTableColumn } = useAddTableDataMutation(nodeId, {
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutate: updateTableColumn } = useUpdateTableDataMutation(nodeId, {
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

  const { mutate: deleteTableColumn } = useDeleteTableDataMutation(nodeId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const addTableData = useCallback(() => {
    tableDataFormModal({
      title: t('ACTION.ADD', { type: t('COMMON.DATA').toLowerCase() }),
      tableContent: content,
      metadata,
      onSave: addTableColumn,
    });
  }, [t, content, metadata, addTableColumn]);

  const editTableData = useCallback(
    (data: TableData) => {
      tableDataFormModal({
        title: t('ACTION.EDIT', { type: t('COMMON.DATA').toLowerCase() }),
        tableContent: content,
        metadata,
        data,
        onSave: formData => updateTableColumn({ ...formData, id: data.id }),
      });
    },
    [t, content, metadata, updateTableColumn],
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
