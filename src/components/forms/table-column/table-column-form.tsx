import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormButtons, FormItem, Button } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CreateColumnRequest } from '~/api/utils/api-requests';
import { FormCheckbox, FormInputText, FormSelect } from '~/components/react-hook-form';

import { getSchema } from './table-column-form.schema';
import { useSelectColumnTypes } from './use-select-column-types.hook';

interface TableColumnFormProps {
  usedNames: string[];
  onReject?: () => void;
  onResolve: (values: CreateColumnRequest) => void;
}

export const TableColumnForm: FC<TableColumnFormProps> = ({ usedNames, onResolve, onReject }) => {
  const { t } = useTranslation();
  const { selectColumnTypes } = useSelectColumnTypes();

  const schema = getSchema(usedNames, t);
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<CreateColumnRequest>({
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
        <FormSelect items={selectColumnTypes} controllerProps={{ ...register('type'), control }} />
      </FormItem>
      <FormCheckbox
        label={t('STRUCTURE.UNIQUE_FIELD')}
        controllerProps={{ ...register('unique'), control }}
      />
      <FormCheckbox
        label={t('STRUCTURE.OPTIONAL_FIELD')}
        controllerProps={{ ...register('nullable'), control }}
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
