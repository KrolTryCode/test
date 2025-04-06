// src/components/forms/diagram/diagram-form.tsx
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as y from 'yup';

import { DiagramRequest } from '~/api/utils/api-requests';
import { FormInputText } from '~/components/react-hook-form';

// Схема валидации формы
const diagramFormSchema = y.object({
  name: y.string().required().default(''),
  description: y.string().default(''),
  projectId: y.string().optional(),
});

interface DiagramFormProps {
  data?: Partial<DiagramRequest>;
  onReject?: () => void;
  onResolve: (data: DiagramRequest) => void;
  isPending?: boolean;
}

export const DiagramForm: FC<DiagramFormProps> = ({ data, onReject, onResolve, isPending }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<DiagramRequest>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: data,
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: yupResolver(diagramFormSchema),
  });

  return (
    <Form showColonAfterLabel onSubmit={handleSubmit(onResolve)}>
      <FormItem label={t('COMMON.TITLE')} isRequired>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.DESCRIPTION')}>
        <FormInputText
          isMultiline
          controllerProps={{ ...register('description'), control }}
        />
      </FormItem>

      <FormButtons>
        <Button onClick={onReject}>{t('ACTION.CANCEL')}</Button>
        <Button
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          disabled={(!isValid && isSubmitted) || isPending}
          isLoading={isPending}
        >
          {t('ACTION.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};
