import { yupResolver } from '@hookform/resolvers/yup';
import {
  Form,
  FormItem,
  FormButtons,
  Button,
  modal,
  confirmActionModal,
} from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { useParams, useBlocker } from '@tanstack/react-router';
import { FC, useEffect } from 'react';
import { FormProvider, useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { getFormsQueryOptions } from '~/api/queries/forms/get-forms.query';
import { getSchema, ITaskForm } from '~/components/forms/task/task-form.schema';
import { FormInputText, FormSelect } from '~/components/react-hook-form';

import { TaskFormParameters } from './task-form-parameters';

type EditTaskForm = Pick<ITaskForm, 'name' | 'description'>;

interface TaskFormProps {
  data?: EditTaskForm;
  isEditing?: boolean;
  isPending?: boolean;
  onReject: () => void;
  onResolve: (data: ITaskForm) => void;
}

export const TaskForm: FC<TaskFormProps> = ({
  data,
  onReject,
  onResolve,
  isPending,
  isEditing = false,
}) => {
  const { t } = useTranslation();
  const { projectId = '' } = useParams({ strict: false });

  const schema = getSchema(isEditing);

  const formMethods = useForm<ITaskForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: data ?? schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { isValid, isSubmitted, isLoading, isDirty },
  } = formMethods;

  const { proceed, status } = useBlocker({
    shouldBlockFn: () => !isEditing && isDirty && !isSubmitted,
    withResolver: true,
  });

  useEffect(() => {
    if (status === 'blocked') {
      confirmActionModal({
        title: t('MESSAGE.CONFIRM_LEAVING_FORM_PAGE.TITLE'),
        messageText: t('MESSAGE.CONFIRM_LEAVING_FORM_PAGE.TEXT'),
        onOk: proceed,
      });
    }
  }, [proceed, status, t]);

  const { field: formIdField } = useController({ control, name: 'formId' });
  const { fieldState: parametersFieldState } = useController({ control, name: 'parameters' });

  const { data: forms = [], isLoading: isFormsLoading } = useQuery(getFormsQueryOptions(projectId));

  const handleChangeFormValue = (value: string) => {
    if (parametersFieldState.isDirty) {
      confirmActionModal({
        title: t('TASK.CONFIRM_FORM_CHANGE.TITLE'),
        messageText: t('TASK.CONFIRM_FORM_CHANGE.TEXT'),
        onOk: () => {
          formIdField.onChange(value);
        },
      });
      return formIdField.value;
    }
    return value;
  };

  return (
    <FormProvider {...formMethods}>
      <Form
        gap={1}
        labelWidth={isEditing ? 1 : 4}
        maxWidth={'900px'}
        showColonAfterLabel
        labelPosition={isEditing ? 'top' : 'left'}
        isLoading={isFormsLoading}
        onSubmit={handleSubmit(values => {
          onResolve(values);
          proceed?.();
        })}
      >
        <FormItem label={t('COMMON.TITLE')} isRequired>
          <FormInputText controllerProps={{ ...register('name'), control }} />
        </FormItem>
        <FormItem label={t('COMMON.DESCRIPTION')}>
          <FormInputText controllerProps={{ ...register('description'), control }} />
        </FormItem>
        <FormItem
          label={t('ENTITY.FORM')}
          isHidden={isEditing}
          isRequired={!isEditing}
          isDisabled={isFormsLoading}
        >
          <FormSelect
            items={forms}
            disableClearable
            controllerProps={{ ...register('formId'), control }}
            onChange={handleChangeFormValue}
          />
        </FormItem>

        {!isEditing && <TaskFormParameters projectId={projectId} formId={formIdField.value} />}

        <FormButtons>
          <Button onClick={onReject} color={'primary'}>
            {t('ACTION.CANCEL')}
          </Button>
          <Button
            type={'submit'}
            disabled={!isValid && isSubmitted}
            variant={'contained'}
            color={'primary'}
            isLoading={isLoading || isPending}
          >
            {t('ACTION.SAVE')}
          </Button>
        </FormButtons>
      </Form>
    </FormProvider>
  );
};

interface TaskModalProps {
  title: string;
  data?: EditTaskForm;
  onOk: (data: EditTaskForm) => void;
}

export const taskModal = ({ title, onOk, data }: TaskModalProps) =>
  modal({
    title,
    onOk,
    renderContent: (modalInstance: InstanceProps<EditTaskForm, never>) => (
      <TaskForm data={data} isEditing={!!data} {...modalInstance} />
    ),
  });
