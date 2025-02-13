import { modal } from '@pspod/ui-components';
import { InstanceProps } from 'react-modal-promise';

import { ExportProjectForm } from './export-project-form';

export const exportProjectModal = ({
  title,
  projectId,
  onExport,
}: {
  title: string;
  projectId: string;
  onExport: (data: string[]) => Promise<void>;
}) =>
  modal({
    title,
    onOk: onExport,
    renderContent: (modalInstance: InstanceProps<string[], never>) => (
      <ExportProjectForm
        {...modalInstance}
        projectId={projectId}
        onSave={modalInstance.onResolve}
      />
    ),
  });
