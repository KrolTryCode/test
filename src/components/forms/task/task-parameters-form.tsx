import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { useParams } from '@tanstack/react-router';
import { BaseSyntheticEvent, FC, useMemo } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetFormParametersQuery } from '~/api/queries/forms/parameters/get-parameters.query';
import { useGetSolversQuery } from '~/api/queries/solvers/get-solvers.query';
import { sortParametersByIndex } from '~/api/selectors/sort-parameters-by-index';
import { DataType, FullTaskInfo, ParameterField, TaskState } from '~/api/utils/api-requests';
import { FormInputNumeric, FormInputText, FormSelect } from '~/components/react-hook-form';

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

  const { data: solvers = [], isLoading: isSolversLoading } = useGetSolversQuery(projectId);
  const { data: parameters, isLoading: isParametersLoading } = useGetFormParametersQuery(formId, {
    select: sortParametersByIndex,
  });

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

  const renderParameter = (parameter: ParameterField) => {
    let component: JSX.Element;
    switch (parameter.type) {
      case DataType.Uuid: {
        if (parameter.key === 'solver') {
          component = (
            <FormSelect items={solvers} controllerProps={{ ...register(parameter.key), control }} />
          );
        } else {
          component = (
            <FormSelect items={[]} controllerProps={{ ...register(parameter.key), control }} />
          );
        }
        break;
      }
      case DataType.Timestamp: {
        component = <FormInputNumeric controllerProps={{ ...register(parameter.key), control }} />;
        break;
      }

      case DataType.Boolean:
      case DataType.Date:
      case DataType.Float:
      case DataType.LineString:
      case DataType.Int:
      case DataType.Point:
      case DataType.Polygon:
      case DataType.String:
      default: {
        component = <FormInputText controllerProps={{ ...register(parameter.key), control }} />;
      }
    }
    return (
      <FormItem key={parameter.key} label={parameter.name} isRequired={parameter.isRequired}>
        {component}
      </FormItem>
    );
  };

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
      {parameters?.map(parameter => renderParameter(parameter))}
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
