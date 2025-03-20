import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, FormButtons, Button } from '@pspod/ui-components';
import { useIsMutating } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { tableQueries } from '~/api/queries/tables/queries';
import { DataType, TableColumn } from '~/api/utils/api-requests';
import { FormCheckbox, FormDateTimePicker, FormInputText } from '~/components/react-hook-form';
import {
  NumericInputWithPlaceholder,
  UUIDInputWithPlaceholder,
} from '~/components/react-hook-form/form-inputs-with-placeholders';

import { getSchema } from './table-data-form.schema';

export interface TableDataFormProps<TableData = Record<string, any>>
  extends Pick<InstanceProps<TableData, unknown>, 'onResolve' | 'onReject'> {
  metadata: TableColumn[];
  tableContent: TableData[];
  data?: TableData;
  onSave: (data: TableData) => Promise<void | string[]>;
}

export const TableDataForm: FC<TableDataFormProps> = ({
  onResolve,
  onReject,
  onSave,
  metadata,
  data,
  tableContent,
}) => {
  const { t } = useTranslation();

  const isMutating = useIsMutating({ mutationKey: tableQueries._def });

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

  const onSubmit = async (data: Record<string, any>) => {
    await onSave(data);
    onResolve();
  };

  return (
    <Form
      showColonAfterLabel
      labelPosition={'left'}
      labelWidth={2}
      onSubmit={handleSubmit(onSubmit)}
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
          isLoading={!!isMutating}
        >
          {t('ACTION.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};
