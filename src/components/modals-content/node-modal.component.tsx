import { modal } from '@pspod/ui-components';
import { InstanceProps } from 'react-modal-promise';

import { CreateContentNodeRequest } from '~/api/utils/api-requests';
import { NodeForm } from '~/components/node-form/node-form.component';

interface NodeModalProps {
  title: string;
  data?: Partial<CreateContentNodeRequest>;
  isEditing?: boolean;
  onSave: (data: CreateContentNodeRequest) => void;
  projectId?: string;
  currentNodeId: string | undefined;
}
export const nodeModal = ({
  title,
  data,
  isEditing,
  onSave,
  projectId,
  currentNodeId,
}: NodeModalProps) =>
  modal({
    title,
    onOk: onSave,
    renderContent: (args: InstanceProps<CreateContentNodeRequest, never>) => (
      <NodeForm
        data={data}
        projectId={projectId}
        currentNodeId={currentNodeId}
        isEditing={isEditing}
        {...args}
      />
    ),
  });
