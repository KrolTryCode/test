import { FC } from 'react';

import { useParameterChecks } from '~/components/checks/parameter-checks/parameter-checks.hook';
import { ChecksTable } from '~/components/tables/checks/checks-table.component';

interface ParameterChecksProps {
  formId: string;
  fieldId: string;
}

export const ParameterChecks: FC<ParameterChecksProps> = ({ formId, fieldId }) => {
  const { checks, deleteCheck, handleAddCheck, parameters, isLoading } = useParameterChecks(
    formId,
    fieldId,
  );

  return (
    <ChecksTable
      checks={checks}
      isLoading={isLoading}
      handleDeleteCheck={deleteCheck}
      handleAddCheck={handleAddCheck}
      parents={parameters}
    />
  );
};
