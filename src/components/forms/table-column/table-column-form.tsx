import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormButtons, FormItem, Button } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { CreateColumnRequest, DataType } from '~/api/utils/api-requests';
import {
  getSchema,
  ITableColumnForm,
} from '~/components/forms/table-column/table-column-form.schema';
import { FormCheckbox, FormInputText, FormSelect } from '~/components/react-hook-form';
import { useCustomTranslations } from '~/utils/hooks/use-custom-translations';

interface TableColumnFormProps {
  usedNames: string[];
  onReject?: () => void;
  onResolve: (values: CreateColumnRequest) => void;
}

export const TableColumnForm: FC<TableColumnFormProps> = ({ usedNames, onResolve, onReject }) => {
  const { t, translateColumnType } = useCustomTranslations();

  const schema = getSchema(usedNames, t);
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<ITableColumnForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const onSubmit = (v: ITableColumnForm) => {
    const data = { ...v, nullable: !v.required };
    // @ts-expect-error required
    delete data.required;
    onResolve(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} isRequired>
      <FormItem label={t('COMMON.TITLE')}>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem label={t('STRUCTURE.TYPE')}>
        <FormSelect
          items={Object.values(DataType)}
          translateItemsFunction={translateColumnType}
          controllerProps={{ ...register('type'), control }}
        />
      </FormItem>
      <FormCheckbox
        label={t('STRUCTURE.UNIQUE_FIELD')}
        controllerProps={{ ...register('unique'), control }}
      />
      <FormCheckbox
        label={t('STRUCTURE.REQUIRED_FIELD')}
        controllerProps={{ ...register('required'), control }}
      />
      <FormButtons>
        <Button onClick={onReject} variant={'outlined'} color={'primary'}>
          {t('ACTION.CANCEL')}
        </Button>
        <Button
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          disabled={!isValid && isSubmitted}
          isLoading={isSubmitting}
        >
          {t('ACTION.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};
