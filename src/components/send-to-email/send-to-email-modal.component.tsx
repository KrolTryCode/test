import { yupResolver } from '@hookform/resolvers/yup';
import { Clear } from '@mui/icons-material';
import { Grid2 as Grid, IconButton } from '@mui/material';
import { Button, Form, FormButtons, FormItem, modal, CreateModalProps } from '@pspod/ui-components';
import { t } from 'i18next';
import { FC } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { FormInputText } from '~/components/react-hook-form';
import { schema, EmailsListType } from '~/components/send-to-email/emails.schema';

interface EnterEmailFormProps
  extends Pick<CreateModalProps<Record<string, never>>, 'onResolve' | 'onReject'> {
  isMultiple?: boolean;
}

const EnterEmailsForm: FC<EnterEmailFormProps> = ({ isMultiple = true, onResolve, onReject }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<EmailsListType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'emails',
    control,
  });

  const onSubmit = (data: EmailsListType) => {
    onResolve(data.emails.map(value => value.email));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} showColonAfterLabel>
      {fields.map((entry, index) => (
        <FormItem key={entry.id} isRequired label={t('USER.EMAIL_ADDRESS')}>
          <Grid key={entry.id} container direction={'row'} alignItems={'flex-end'}>
            <Grid size={{ xs: 11 }}>
              <FormInputText
                controllerProps={{
                  ...register(`emails.${index}.email` as const),
                  control,
                }}
              />
            </Grid>
            {fields.length > 1 && (
              <IconButton color={'error'} onClick={() => remove(index)}>
                <Clear />
              </IconButton>
            )}
          </Grid>
        </FormItem>
      ))}
      {isMultiple && (
        <FormItem>
          <Button
            onClick={() => append({ email: '' })}
            variant={'outlined'}
            color={'primary'}
            disabled={!isValid}
          >
            {t('ACTION.ADD')}
          </Button>
        </FormItem>
      )}

      <FormButtons>
        <Button onClick={onReject} variant={'outlined'} color={'primary'}>
          {t('ACTION.CANCEL')}
        </Button>
        <Button
          variant={'contained'}
          color={'primary'}
          type={'submit'}
          disabled={!isValid && isSubmitted}
          isLoading={isSubmitting}
        >
          {t('ACTION.SEND')}
        </Button>
      </FormButtons>
    </Form>
  );
};

interface SendToEmailModalProps {
  isMultiple?: boolean;
  onOk: (values: string[]) => Promise<void>;
}

export const sendToEmailsModal = ({ onOk, isMultiple }: SendToEmailModalProps) => {
  modal({
    title: t('ACTION.SEND_TO_EMAIL'),
    onOk,
    renderContent: (props: InstanceProps<never>) => (
      <EnterEmailsForm isMultiple={isMultiple} {...props} />
    ),
  });
};
