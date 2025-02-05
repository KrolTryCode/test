import { notifySuccess } from '@pspod/ui-components';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAddTableDataMutation } from '~/api/queries/tables/table-data/add-table-data.mutation';
import { useDeleteTableDataMutation } from '~/api/queries/tables/table-data/delete-table-data.mutation';
import { useGetTableContentQuery } from '~/api/queries/tables/table-data/get-table-content.query';
import { useGetTableDataQuery } from '~/api/queries/tables/table-data/get-table-data.query';
import { useUpdateTableDataMutation } from '~/api/queries/tables/table-data/update-table-data.mutation';
import { tableDataFormModal } from '~/components/forms/table-data/table-data-form.modal';
import { showErrorMessage } from '~/utils/show-error-message';

export type TableData = Record<string, any> & { id: string };

export const useTableData = (nodeId: string) => {
  const { t } = useTranslation();

  const {
    data: content = [],
    isError: isContentError,
    isLoading: isContentLoading,
  } = useGetTableContentQuery(nodeId);

  const { data: metadata = [], isLoading: isMetadataLoading } = useGetTableDataQuery(nodeId, {
    select: data => data.columns.filter(v => v.name !== 'id'),
  });

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
        tableColumnOrder.findIndex(v => v === a.name) -
        tableColumnOrder.findIndex(v => v === b.name)
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
