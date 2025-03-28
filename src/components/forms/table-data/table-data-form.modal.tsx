import { modal } from '@pspod/ui-components';
import { InstanceProps } from 'react-modal-promise';

import { TableDataForm, TableDataFormProps } from './table-data-form';

interface ModalProps extends Omit<TableDataFormProps, 'onReject' | 'onResolve'> {
  title: string;
  tableId: string;
}

export const tableDataFormModal = ({ title, ...formProps }: ModalProps) =>
  modal({
    title,
    renderContent: (modalInstance: InstanceProps<Record<string, any>, unknown>) => (
      <TableDataForm {...modalInstance} {...formProps} />
    ),
  });
