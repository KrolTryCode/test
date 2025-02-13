import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CreateProjectParameterFormRequest } from '~/api/utils/api-requests';
import { FormInputText } from '~/components/react-hook-form';

import { schema } from './task-form.schema';

interface AddTaskFormProps {
  onResolve: (data: CreateProjectParameterFormRequest) => void;
  onReject: () => void;
  isPending?: boolean;
}

export const AddTaskForm: FC<AddTaskFormProps> = ({ onResolve, onReject, isPending }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<CreateProjectParameterFormRequest>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  return (
    <Form showColonAfterLabel onSubmit={handleSubmit(onResolve)}>
      <FormItem label={t('COMMON.TITLE')} isRequired>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormButtons>
        <Button onClick={onReject} variant={'outlined'} color={'primary'}>
          {t(`ACTION.CANCEL`)}
        </Button>{' '}
        <Button
          type={'submit'}
          disabled={!isValid && isSubmitted}
          isLoading={isPending}
          variant={'contained'}
          color={'primary'}
        >
          {t('ACTION.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};
