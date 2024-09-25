import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ColumnDefinition } from '~/api/utils/api-requests';
import { FormInputText, FormSelect } from '~/components/react-hook-form';
import { schema } from '~/pages/tables/table-structure/add-column/add-column-form.schema';
import { selectColumnTypes } from '~/pages/tables/table-structure/add-column/add-column-form.utils';
import { Button } from '~/ui-components/button/button.component';
import { Form, FormButtons, FormItem } from '~/ui-components/form';

interface AddColumnFormProps {
  onReject?: () => void;
  onResolve: (values: ColumnDefinition) => void;
}

export const AddColumnForm: FC<AddColumnFormProps> = ({ onResolve, onReject }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<ColumnDefinition>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit(onResolve)} isRequired>
      <FormItem label={t('COMMON.TITLE')}>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem label={t('STRUCTURE.TYPE')}>
        <FormSelect
          items={selectColumnTypes}
          controllerProps={{ ...register('columnType'), control }}
        />
      </FormItem>
      <FormButtons>
        <Button onClick={onReject}>{t('ACTION.CANCEL')}</Button>
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
