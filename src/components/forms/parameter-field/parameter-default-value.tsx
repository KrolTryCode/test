import { useParams } from '@tanstack/react-router';
import { FC } from 'react';
import { UseFormRegister, Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as y from 'yup';

import { useGetSolversQuery } from '~/api/queries/solvers/get-solvers.query';
import { DataType } from '~/api/utils/api-requests';
import { ParameterFieldForm } from '~/components/forms/parameter-field/parameter-field.type';
import {
  FormCheckbox,
  FormDateTimePicker,
  FormInputNumeric,
  FormInputText,
  FormSelect,
} from '~/components/react-hook-form';
import { FormSearchNodeTreeTables } from '~/components/react-hook-form/form-search-tree/form-search-node-tree-tables.component';

interface DefaultValueComponentProps {
  data: ParameterFieldForm;
  register: UseFormRegister<ParameterFieldForm>;
  control: Control<ParameterFieldForm>;
}

export const DefaultValueComponent: FC<DefaultValueComponentProps> = ({
  data,
  register,
  control,
}) => {
  const { type, key } = data;
  const controllerProps = { ...register('defaultValue'), control };
  const { projectId } = useParams({ strict: false });
  const { t } = useTranslation();

  const { data: solvers = [] } = useGetSolversQuery(projectId ?? '', {
    enabled: key === 'solver',
  });

  //3 hard-coded keys on BE: Решатель, Таблицы, Время моделирования
  if (key === 'solver') {
    return <FormSelect items={solvers} controllerProps={controllerProps} />;
  }
  if (key === 'contents') {
    return <FormSearchNodeTreeTables controllerProps={controllerProps} />;
  }
  if (key === 'timeout') {
    return <FormInputNumeric controllerProps={controllerProps} />;
  }
  switch (type) {
    case DataType.Boolean: {
      return <FormCheckbox label={t('COMMON.DEFAULT_VALUE')} controllerProps={controllerProps} />;
    }
    case DataType.Date: {
      return <FormDateTimePicker type={'date'} controllerProps={controllerProps} />;
    }
    case DataType.Timestamp:
    case DataType.Int:
    case DataType.Float: {
      return <FormInputNumeric controllerProps={controllerProps} />;
    }
    case DataType.LineString:
    case DataType.Point:
    case DataType.Polygon:
    case DataType.String:
    case DataType.Uuid: {
      return <FormInputText controllerProps={controllerProps} />;
    }
  }
};

export const getDefaultValueSchema = (type: DataType, key?: string) => {
  if (key === 'solver') {
    return y.string().uuid().default('');
  }
  if (key === 'contents') {
    return y.string().default('');
  }
  if (key === 'timeout') {
    return y.string().default('');
  }
  switch (type) {
    case DataType.Boolean:
      return y.boolean().default(false);
    case DataType.Timestamp:
    case DataType.Date:
      return y.date();
    case DataType.Float:
      return y.number().default(0);
    case DataType.Int:
      return y.number().integer().default(0);
    case DataType.Uuid:
      return y.string().uuid().default('');
    case DataType.LineString:
    case DataType.Point:
    case DataType.Polygon:
    case DataType.String:
    default:
      return y.string().default('');
  }
};
