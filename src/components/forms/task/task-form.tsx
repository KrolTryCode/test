import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, FormButtons, Button, modal } from '@pspod/ui-components';
import { useParams } from '@tanstack/react-router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { useGetFormsQuery } from '~/api/queries/forms/get-forms.query';
import { FullTaskInfo } from '~/api/utils/api-requests';
import { getSchema } from '~/components/forms/task/task-form.schema';
import { FormInputText, FormSelect } from '~/components/react-hook-form';

export interface IAddTaskForm {
  name: string;
  description: string;
  formId: string;
}

interface TaskFormProps {
  data?: FullTaskInfo;
  isEditing?: boolean;
  isDisabled?: boolean;
  onReject: () => void;
  onResolve: (data: IAddTaskForm) => void;
}

export const TaskForm: FC<TaskFormProps> = ({
  data,
  onReject,
  onResolve,
  isDisabled = false,
  isEditing = false,
}) => {
  const { t } = useTranslation();
  const { projectId = '' } = useParams({ strict: false });

  const schema = getSchema(isEditing);

  const {
    control,
    register,
    handleSubmit,
    formState: { isValid, isSubmitted, isLoading },
  } = useForm<IAddTaskForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: data ?? schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const { data: forms = [], isLoading: isFormsLoading } = useGetFormsQuery(projectId);

  return (
    <Form
      gap={1}
      labelWidth={isEditing ? 1 : 4}
      maxWidth={'900px'}
      showColonAfterLabel
      labelPosition={isEditing ? 'top' : 'left'}
      isLoading={isFormsLoading}
      onSubmit={handleSubmit(onResolve)}
    >
      <FormItem label={t('COMMON.TITLE')} isRequired isDisabled={isDisabled}>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.DESCRIPTION')} isDisabled={isDisabled}>
        <FormInputText controllerProps={{ ...register('description'), control }} />
      </FormItem>
      <FormItem
        label={t('ENTITY.FORM')}
        isHidden={isEditing}
        isRequired={!isEditing}
        isDisabled={isFormsLoading || isDisabled}
      >
        <FormSelect items={forms} controllerProps={{ ...register('formId'), control }} />
      </FormItem>

      {!isDisabled && (
        <FormButtons>
          <Button onClick={onReject} color={'primary'}>
            {t('ACTION.CANCEL')}
          </Button>
          <Button
            type={'submit'}
            disabled={!isValid && isSubmitted}
            variant={'contained'}
            color={'primary'}
            isLoading={isLoading}
          >
            {t('ACTION.NEXT')}
          </Button>
        </FormButtons>
      )}
    </Form>
  );
};

interface TaskModalProps {
  title: string;
  isEditing?: boolean;
  data?: FullTaskInfo;
  onOk: (data: IAddTaskForm) => void;
}

export const taskModal = ({ title, onOk, data, isEditing }: TaskModalProps) =>
  modal({
    title,
    onOk,
    renderContent: (modalInstance: InstanceProps<IAddTaskForm, never>) => (
      <TaskForm data={data} isEditing={isEditing} {...modalInstance} />
    ),
  });
