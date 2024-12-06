import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormButtons, FormItem, Button } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ColumnDefinition } from '~/api/utils/api-requests';
import { FormInputText, FormSelect } from '~/components/react-hook-form';
import { getSchema } from '~/pages/tables/table-structure/add-column/add-column-form.schema';
import { useSelectColumnTypes } from '~/pages/tables/table-structure/add-column/use-select-column-types.hook';

interface AddColumnFormProps {
  usedNames: string[];
  onReject?: () => void;
  onResolve: (values: ColumnDefinition) => void;
}

export const AddColumnForm: FC<AddColumnFormProps> = ({ usedNames, onResolve, onReject }) => {
  const { t } = useTranslation();
  const { selectColumnTypes } = useSelectColumnTypes();

  const schema = getSchema(usedNames, t);
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
