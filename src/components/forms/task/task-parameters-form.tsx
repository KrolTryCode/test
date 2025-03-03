import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { BaseSyntheticEvent, FC, useCallback, useMemo } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getFormParametersQueryOptions } from '~/api/queries/forms/parameters/get-parameters.query';
import { getSolversQueryOptions } from '~/api/queries/solvers/get-solvers.query';
import { sortParametersByIndex } from '~/api/selectors/sort-parameters-by-index';
import {
  ContentNodeType,
  DataType,
  FullTaskInfo,
  ParameterField,
  TaskState,
} from '~/api/utils/api-requests';
import { FormInputNumeric, FormInputText, FormSelect } from '~/components/react-hook-form';
import { FormSelectContentNode } from '~/components/react-hook-form/form-search-content-node/form-search-node-tree.component';

interface TaskParametersFormProps {
  formId: string;
  onCreateTask: (data: FieldValues) => void;
  onStartTask: (data: FieldValues) => void;
  onCancel: () => void;
  onGoToTasksList: () => void;
  createdTaskInfo?: FullTaskInfo;
  isTaskCreating?: boolean;
  isTaskStarting?: boolean;
  isTaskCreated?: boolean;
  isTaskStarted?: boolean;
}

export const TaskParametersForm: FC<TaskParametersFormProps> = ({
  formId,
  onCancel,
  onStartTask,
  onCreateTask,
  onGoToTasksList,
  createdTaskInfo,
  isTaskCreating,
  isTaskStarting,
  isTaskCreated,
  isTaskStarted,
}) => {
  const { t } = useTranslation();
  const { projectId = '' } = useParams({ strict: false });

  const { data: solvers = [], isLoading: isSolversLoading } = useQuery(
    getSolversQueryOptions(projectId),
  );
  const { data: parameters, isLoading: isParametersLoading } = useQuery(
    getFormParametersQueryOptions(formId, {
      select: sortParametersByIndex,
    }),
  );

  const defaultValues = parameters?.reduce(
    (acc, parameter) => {
      acc[parameter.key] = parameter.defaultValue;
      return acc;
    },
    {} as Record<string, any>,
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { isLoading },
  } = useForm({ mode: 'onBlur', reValidateMode: 'onBlur', values: defaultValues });

  const renderParameter = useCallback(
    (parameter: ParameterField) => {
      if (parameter.key === 'solver') {
        return (
          <FormSelect items={solvers} controllerProps={{ ...register(parameter.key), control }} />
        );
      }

      if (parameter.key === 'contents') {
        return (
          <FormSelectContentNode
            isMultiple={true}
            /*
              TODO: pass path to selected node (https://tracker.yandex.ru/BE-220)
              example src/components/trees/app-group-select-tree
            */
            pathToSelected={[]}
            controllerProps={{ ...register(parameter.key), control }}
            projectId={projectId}
            canSelectItem={({ type }) => type === ContentNodeType.Table}
          />
        );
      }
      switch (parameter.type) {
        case DataType.Timestamp:
        case DataType.Int:
        case DataType.Float:
          return <FormInputNumeric controllerProps={{ ...register(parameter.key), control }} />;

        case DataType.Uuid:
        case DataType.Boolean:
        case DataType.Date:
        case DataType.LineString:
        case DataType.Point:
        case DataType.Polygon:
        case DataType.String:
        default:
          return <FormInputText controllerProps={{ ...register(parameter.key), control }} />;
      }
    },
    [control, projectId, register, solvers],
  );

  const onSubmit = (data: FieldValues, event?: BaseSyntheticEvent) => {
    const submitter = (event?.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    if (submitter?.value === 'create') {
      onCreateTask(data);
    } else if (submitter?.value === 'run') {
      onStartTask(data);
    }
  };

  const canCreateTask = useMemo(
    () => !createdTaskInfo && !isTaskCreated && !isTaskCreating,
    [createdTaskInfo, isTaskCreated, isTaskCreating],
  );

  const canTaskRun = useMemo(
    () =>
      !!createdTaskInfo &&
      createdTaskInfo?.state === TaskState.ReadyToStart &&
      !isTaskStarting &&
      !isTaskStarted,
    [createdTaskInfo, isTaskStarted, isTaskStarting],
  );

  return (
    <Form
      gap={1}
      labelWidth={4}
      maxWidth={'900px'}
      showColonAfterLabel
      labelPosition={'left'}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isParametersLoading || isSolversLoading}
    >
      {parameters?.map(parameter => (
        <FormItem key={parameter.key} label={parameter.name} isRequired={parameter.isRequired}>
          {renderParameter(parameter)}
        </FormItem>
      ))}
      <FormButtons>
        {createdTaskInfo ? (
          <Button onClick={onGoToTasksList} variant={'outlined'} color={'primary'}>
            {t('ACTION.GO_TO_TASKS')}
          </Button>
        ) : (
          <Button onClick={onCancel} variant={'outlined'} color={'primary'}>
            {t('ACTION.CANCEL')}
          </Button>
        )}

        <Button
          type={'submit'}
          value={'create'}
          color={'primary'}
          variant={'contained'}
          isLoading={isLoading}
          disabled={!canCreateTask}
        >
          {t('ACTION.CREATE', { type: t('ENTITY.TASK').toLowerCase() })}
        </Button>
        <Button
          value={'run'}
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          isLoading={isLoading}
          disabled={!canTaskRun}
        >
          {t('ACTION.RUN', { what: t('ENTITY.TASK').toLowerCase() })}
        </Button>
      </FormButtons>
    </Form>
  );
};
