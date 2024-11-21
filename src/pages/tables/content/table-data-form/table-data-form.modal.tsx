import { modal } from '@pspod/ui-components';
import { InstanceProps } from 'react-modal-promise';

import { ColumnMetadata } from '~/api/utils/api-requests';

import { TableDataForm } from './table-data-form.component';

export const tableDataFormModal = ({
  title,
  metadata,
  data,
  onSave,
}: {
  title: string;
  metadata: ColumnMetadata[];
  data?: Record<string, any>;
  onSave: (data: Record<string, any>) => void;
}) =>
  modal({
    title,
    onOk: onSave,
    renderContent: (modalInstance: InstanceProps<Record<string, any>, never>) => (
      <TableDataForm {...modalInstance} metadata={metadata} data={data} />
    ),
  });
