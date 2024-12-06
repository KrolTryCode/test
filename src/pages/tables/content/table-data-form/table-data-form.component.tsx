import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, FormButtons, Button } from '@pspod/ui-components';
import { FC, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ColumnMetadata, ColumnType } from '~/api/utils/api-requests';
import {
  FormCheckbox,
  FormDateTimePicker,
  FormInputNumeric,
  FormInputText,
} from '~/components/react-hook-form';

import { getSchema } from './table-data-form.schema';

interface TableDataFormProps<TableData = Record<string, any>> {
  metadata: ColumnMetadata[];
  data?: TableData;
  onResolve: (data: TableData) => void;
  onReject: () => void;
}

export const TableDataForm: FC<TableDataFormProps> = ({ onResolve, onReject, metadata, data }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(getSchema(metadata)),
    values: data,
  });

  const renderComponent = ({ type, name }: ColumnMetadata): ReactNode => {
    let component = <></>;
    switch (type) {
      case ColumnType.Boolean: {
        component = <FormCheckbox controllerProps={{ ...register(name), control }} />;
        break;
      }
      case ColumnType.Double:
      case ColumnType.Integer: {
        component = (
          <FormInputNumeric
            step={type === ColumnType.Integer ? 1 : 0.01}
            placeholder={type === ColumnType.Integer ? '0' : '0.00'}
            controllerProps={{ ...register(name), control }}
          />
        );
        break;
      }
      case ColumnType.Date:
      case ColumnType.Timestamp: {
        component = (
          <FormDateTimePicker
            type={type === ColumnType.Date ? 'date' : 'datetime'}
            controllerProps={{ ...register(name), control }}
          />
        );
        break;
      }
      case ColumnType.UUID: {
        component = (
          <FormInputText
            mask={'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'}
            definitions={{ X: /[0-9a-f]/ }}
            controllerProps={{ ...register(name), control }}
          />
        );
        break;
      }
      case ColumnType.Geometry:
      case ColumnType.Varchar:
      default: {
        component = <FormInputText controllerProps={{ ...register(name), control }} />;
      }
    }
    return (
      <FormItem key={name} label={name}>
        {component}
      </FormItem>
    );
  };

  return (
    <Form
      showColonAfterLabel
      labelPosition={'left'}
      labelWidth={2}
      onSubmit={handleSubmit(onResolve)}
    >
      {metadata.map(renderComponent)}
      <FormButtons isSticky>
        <Button onClick={onReject} variant={'outlined'} color={'primary'}>
          {t('ACTION.CANCEL')}
        </Button>
        <Button
          color={'primary'}
          variant={'contained'}
          type={'submit'}
          disabled={!isValid && isSubmitted}
        >
          {t('ACTION.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};
