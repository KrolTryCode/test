import { FormItem, Fieldset } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { FC, useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getFormParametersQueryOptions } from '~/api/queries/forms/parameters/get-parameters.query';
import { getSolversQueryOptions } from '~/api/queries/solvers/get-solvers.query';
import { sortParametersByIndex } from '~/api/selectors/sort-parameters-by-index';
import { ContentNodeType, DataType, ParameterField } from '~/api/utils/api-requests';
import { FormDateTimePicker, FormInputText, FormSelect } from '~/components/react-hook-form';
import {
  NumericInputWithPlaceholder,
  UUIDInputWithPlaceholder,
} from '~/components/react-hook-form/form-inputs-with-placeholders';
import { FormSelectContentNode } from '~/components/react-hook-form/form-search-content-node/form-search-node-tree.component';
import { parseDefaultValue } from '~/utils/form-parameters/parse-default-value';

import { ITaskForm } from './task-form.schema';

interface TaskFormParametersProps {
  projectId: string;
  formId: ITaskForm['formId'];
}

export const TaskFormParameters: FC<TaskFormParametersProps> = ({ projectId, formId }) => {
  const { t } = useTranslation();
  const { control, register, setValue, resetField } = useFormContext<ITaskForm>();

  const { data: solvers = [] } = useQuery(getSolversQueryOptions(projectId));
  const { data: parameters = [] } = useQuery(
    getFormParametersQueryOptions(formId, {
      select: sortParametersByIndex,
      enabled: !!formId,
    }),
  );

  useEffect(() => {
    if (formId) {
      resetField('parameters', { keepDirty: false, keepTouched: false, keepError: false });
      parameters.forEach(param => {
        resetField(`parameters.${param.key}`, {
          defaultValue: parseDefaultValue(param),
          keepDirty: false,
          keepTouched: false,
          keepError: false,
        });
      });
    }
  }, [formId, parameters, resetField, setValue]);

  const renderParameter = useCallback(
    ({ key, type }: ParameterField) => {
      const controllerProps = { ...register(`parameters.${key}`), control };

      if (key === 'solver') {
        return <FormSelect items={solvers} controllerProps={controllerProps} />;
      }

      if (key === 'contents') {
        return (
          <FormSelectContentNode
            isMultiple
            /*
              TODO: pass path to selected node (https://tracker.yandex.ru/BE-220)
              example src/components/trees/app-group-select-tree
            */
            pathToSelected={[]}
            controllerProps={controllerProps}
            projectId={projectId}
            canSelectItem={({ type }) => type === ContentNodeType.Table}
          />
        );
      }

      switch (type) {
        case DataType.Boolean:
          return <FormSelect items={['false', 'true']} controllerProps={controllerProps} />;
        case DataType.Float:
        case DataType.Int:
          return <NumericInputWithPlaceholder type={type} controllerProps={controllerProps} />;
        case DataType.Date:
        case DataType.Timestamp: {
          return (
            <FormDateTimePicker
              type={type === DataType.Date ? 'date' : 'datetime'}
              controllerProps={controllerProps}
            />
          );
        }
        case DataType.Uuid: {
          return <UUIDInputWithPlaceholder controllerProps={controllerProps} />;
        }
        case DataType.LineString:
        case DataType.Point:
        case DataType.Polygon:
        case DataType.String:
        default:
          return <FormInputText controllerProps={controllerProps} />;
      }
    },
    [control, projectId, register, solvers],
  );

  if (!parameters.length) {
    return <></>;
  }

  return (
    <Fieldset legend={t('TASK.SET_PARAMETERS')} direction={'column'}>
      {parameters.map(parameter => (
        <FormItem key={parameter.key} label={parameter.name} isRequired={parameter.isRequired}>
          {renderParameter(parameter)}
        </FormItem>
      ))}
    </Fieldset>
  );
};
