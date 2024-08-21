import { InstanceProps } from 'react-modal-promise';

import { CreateContentNodeRequest } from '~/api/utils/api-requests';
import { modal } from '~/components/modal/modal';
import { NodeForm, NodeFormData } from '~/components/node-form/node-form.component';

interface NodeModalProps {
  title: string;
  data?: NodeFormData;
  isEditing?: boolean;
  onSave: (data: CreateContentNodeRequest) => void;
}
export const nodeModal = ({ title, data, isEditing, onSave }: NodeModalProps) =>
  modal({
    title,
    onOk: onSave,
    renderContent: (args: InstanceProps<CreateContentNodeRequest, never>) => (
      <NodeForm data={data} isEditing={isEditing} {...args} />
    ),
  });
