import { notifySuccess } from '@pspod/ui-components';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAddTableDataMutation } from '~/api/queries/tables/add-table-data.mutation';
import { useDeleteTableDataMutation } from '~/api/queries/tables/delete-table-data.mutation';
import { useGetTableContentQuery } from '~/api/queries/tables/get-table-content.query';
import { useGetTableMetadataColumns } from '~/api/queries/tables/structure/get-table-metadata.query';
import { useUpdateTableDataMutation } from '~/api/queries/tables/update-table-data.mutation';
import { showErrorMessage } from '~/utils/show-error-message';

import { tableDataFormModal } from './table-data-form/table-data-form.modal';

export type TableData = Record<string, any> & { id: string };

export const useTableData = (nodeId: string) => {
  const { t } = useTranslation();

  const {
    data: content = [],
    isError: isContentError,
    isLoading: isContentLoading,
  } = useGetTableContentQuery(nodeId);

  const { data: metadata = [], isLoading: isMetadataLoading } = useGetTableMetadataColumns(nodeId, {
    select: data => data.columnsMetadata.filter(v => v.name !== 'id'),
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
      metadata,
      onSave: addTableColumn,
    });
  }, [addTableColumn, t, metadata]);

  const editTableData = useCallback(
    (data: TableData) => {
      tableDataFormModal({
        title: t('ACTION.EDIT', { type: t('COMMON.DATA').toLowerCase() }),
        metadata,
        data,
        onSave: formData => updateTableColumn({ ...formData, id: data.id }),
      });
    },
    [updateTableColumn, t, metadata],
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
