import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, FormButtons, Button } from '@pspod/ui-components';
import { FC, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { DataType, TableColumn } from '~/api/utils/api-requests';
import { FormCheckbox, FormDateTimePicker, FormInputText } from '~/components/react-hook-form';
import {
  NumericInputWithPlaceholder,
  UUIDInputWithPlaceholder,
} from '~/components/react-hook-form/form-inputs-with-placeholders';

import { getSchema } from './table-data-form.schema';

interface TableDataFormProps<TableData = Record<string, any>> {
  metadata: TableColumn[];
  tableContent: TableData[];
  data?: TableData;
  onResolve: (data: TableData) => void;
  onReject: () => void;
}

export const TableDataForm: FC<TableDataFormProps> = ({
  onResolve,
  onReject,
  metadata,
  data,
  tableContent,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(getSchema(metadata, tableContent)),
    values: data,
  });

  const renderComponent = ({ type, id, displayName, nullable }: TableColumn): ReactNode => {
    let component = <></>;
    switch (type) {
      case DataType.Boolean: {
        component = <FormCheckbox controllerProps={{ ...register(id), control }} />;
        break;
      }
      case DataType.Float:
      case DataType.Int: {
        component = (
          <NumericInputWithPlaceholder type={type} controllerProps={{ ...register(id), control }} />
        );
        break;
      }
      case DataType.Date:
      case DataType.Timestamp: {
        component = (
          <FormDateTimePicker
            type={type === DataType.Date ? 'date' : 'datetime'}
            controllerProps={{ ...register(id), control }}
          />
        );
        break;
      }
      case DataType.Uuid: {
        component = <UUIDInputWithPlaceholder controllerProps={{ ...register(id), control }} />;
        break;
      }
      case DataType.LineString:
      case DataType.Point:
      case DataType.Polygon:
      case DataType.String:
      default: {
        component = <FormInputText controllerProps={{ ...register(id), control }} />;
      }
    }
    return (
      <FormItem key={id} label={displayName} isRequired={!nullable}>
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
