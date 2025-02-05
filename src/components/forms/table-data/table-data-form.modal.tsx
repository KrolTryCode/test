import { modal } from '@pspod/ui-components';
import { InstanceProps } from 'react-modal-promise';

import { TableColumn } from '~/api/utils/api-requests';

import { TableDataForm } from './table-data-form';

export const tableDataFormModal = ({
  title,
  metadata,
  tableContent,
  data,
  onSave,
}: {
  title: string;
  metadata: TableColumn[];
  tableContent: Record<string, any>[];
  data?: Record<string, any>;
  onSave: (data: Record<string, any>) => void;
}) =>
  modal({
    title,
    onOk: onSave,
    renderContent: (modalInstance: InstanceProps<Record<string, any>, never>) => (
      <TableDataForm
        {...modalInstance}
        metadata={metadata}
        data={data}
        tableContent={tableContent}
      />
    ),
  });
