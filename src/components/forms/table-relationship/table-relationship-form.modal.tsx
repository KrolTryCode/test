import { modal } from '@pspod/ui-components';
import { InstanceProps } from 'react-modal-promise';

import { TableRelationshipForm, TableRelationshipFormProps } from './table-relationship-form';
import { ITableRelationshipForm } from './table-relationship-form.schema';

interface ModalProps extends Omit<TableRelationshipFormProps, 'onReject' | 'onResolve'> {
  title: string;
}

export const createRelationshipModal = ({ title, onSave, ...props }: ModalProps) =>
  modal({
    title,
    renderContent: (modalInstance: InstanceProps<ITableRelationshipForm, unknown>) => (
      <TableRelationshipForm {...modalInstance} {...props} onSave={onSave} />
    ),
  });
