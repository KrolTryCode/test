import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CreateProjectParameterFormRequest } from '~/api/utils/api-requests';
import { ButtonLink } from '~/components/implicit-links';
import { FormInputText } from '~/components/react-hook-form';

import { schema } from './task-form.schema';

interface AddTaskFormProps {
  onSave: (data: CreateProjectParameterFormRequest) => void;
  isPending?: boolean;
}

export const AddTaskForm: FC<AddTaskFormProps> = ({ onSave, isPending }) => {
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
    <Form
      showColonAfterLabel
      labelPosition={'left'}
      labelWidth={4}
      gap={1}
      onSubmit={handleSubmit(onSave)}
      maxWidth={'900px'}
    >
      <FormItem label={t('COMMON.TITLE')} isRequired>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormButtons marginTop={2}>
        <ButtonLink to={'..'}>{t('ACTION.CANCEL')}</ButtonLink>
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
