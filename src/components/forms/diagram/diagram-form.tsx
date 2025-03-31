// src/components/forms/diagram/diagram-form.tsx
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { DiagramRequest } from '~/api/utils/api-requests';
import { FormInputText } from '~/components/react-hook-form';

interface DiagramFormProps {
  data?: DiagramRequest;
  onReject?: () => void;
  onResolve: (values: DiagramRequest) => void;
  isPending?: boolean;
}

const schema = yup.object({
  name: yup.string().required('VALIDATION.REQUIRED_FIELD'),
  description: yup.string().default(''),
});

export const DiagramForm: FC<DiagramFormProps> = ({ data, onReject, onResolve, isPending }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, errors },
  } = useForm<DiagramRequest>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: data,
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  return (
    <Form showColonAfterLabel onSubmit={handleSubmit(onResolve)}>
      <FormItem label={t('COMMON.TITLE')} isRequired>
        <FormInputText
          controllerProps={{ ...register('name'), control }}
          autoFocus
        />
      </FormItem>
      <FormItem label={t('COMMON.DESCRIPTION')}>
        <FormInputText
          isMultiline
          rows={4}
          controllerProps={{ ...register('description'), control }}
        />
      </FormItem>
      <FormButtons>
        <Button onClick={onReject}>{t('ACTION.CANCEL')}</Button>
        <Button
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          disabled={!isValid && isSubmitted}
          isLoading={isPending}
        >
          {t('ACTION.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};
