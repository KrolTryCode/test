import { modal } from '@pspod/ui-components';
import { InstanceProps } from 'react-modal-promise';

import { CreateContentNodeRequest } from '~/api/utils/api-requests';

import { TableNodeForm, TableNodeFormProps } from './table-node-form';

interface TableNodeFormModalProps extends Omit<TableNodeFormProps, 'onReject' | 'onResolve'> {
  title: string;
  onSave: TableNodeFormProps['onResolve'];
}
export const nodeModal = ({
  title,
  data,
  isEditing,
  onSave,
  projectId,
  currentNodeId,
}: TableNodeFormModalProps) =>
  modal({
    title,
    onOk: onSave,
    renderContent: (args: InstanceProps<CreateContentNodeRequest, never>) => (
      <TableNodeForm
        data={data}
        projectId={projectId}
        currentNodeId={currentNodeId}
        isEditing={isEditing}
        {...args}
      />
    ),
  });
