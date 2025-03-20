import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { FC, useEffect } from 'react';
import { UseFormRegister, Control, useWatch, useController } from 'react-hook-form';
import * as y from 'yup';

import { getSolversQueryOptions } from '~/api/queries/solvers/get-solvers.query';
import { ContentNodeType, DataType } from '~/api/utils/api-requests';
import { ParameterFieldForm } from '~/components/forms/parameter-field/parameter-field.type';
import {
  FormDateTimePicker,
  FormInputNumeric,
  FormInputText,
  FormSelect,
} from '~/components/react-hook-form';
import {
  NumericInputWithPlaceholder,
  UUIDInputWithPlaceholder,
} from '~/components/react-hook-form/form-inputs-with-placeholders';
import { FormSelectContentNode } from '~/components/react-hook-form/form-search-content-node/form-search-node-tree.component';
import { parseDefaultValue } from '~/utils/form-parameters/parse-default-value';

interface DefaultValueComponentProps {
  register: UseFormRegister<ParameterFieldForm>;
  control: Control<ParameterFieldForm>;
}

export const DefaultValueComponent: FC<DefaultValueComponentProps> = ({ register, control }) => {
  const key = useWatch({ control, name: 'key' });
  const type = useWatch({ control, name: 'type' });
  const controllerProps = { ...register('defaultValue'), control };
  const { projectId } = useParams({ strict: false });
  const { field } = useController(controllerProps);

  useEffect(() => {
    if ([DataType.Int, DataType.Float].includes(type) && field.value === '') {
      field.onChange(null);
      return;
    }

    if (!(typeof field.value === 'string' && field.value) || type === DataType.Boolean) {
      return;
    }
    if (type === DataType.Date) {
      field.onChange(new Date(field.value));
    } else {
      field.onChange(parseDefaultValue({ defaultValue: field.value, key, type }));
    }
    field.onBlur();
  }, [field, key, type]);

  const { data: solvers = [] } = useQuery(
    getSolversQueryOptions(projectId ?? '', {
      enabled: key === 'solver',
    }),
  );

  //3 hard-coded keys on BE: Решатель, Таблицы, Время моделирования
  if (key === 'solver') {
    return <FormSelect items={solvers} controllerProps={controllerProps} />;
  }
  if (key === 'contents') {
    return (
      <FormSelectContentNode
        controllerProps={controllerProps}
        isMultiple
        /*
          TODO: pass path to selected node (https://tracker.yandex.ru/BE-220)
          example src/components/trees/app-group-select-tree
        */
        pathToSelected={[]}
        projectId={projectId!}
        canSelectItem={({ type }) => type === ContentNodeType.Table}
      />
    );
  }
  if (key === 'timeout') {
    return <FormInputNumeric controllerProps={controllerProps} />;
  }
  switch (type) {
    case DataType.Boolean: {
      return <FormSelect items={['false', 'true']} controllerProps={controllerProps} />;
    }
    case DataType.Float:
    case DataType.Int: {
      return <NumericInputWithPlaceholder type={type} controllerProps={controllerProps} />;
    }
    case DataType.Date:
    case DataType.Timestamp: {
      return (
        <FormDateTimePicker
          type={type === DataType.Date ? 'date' : 'datetime'}
          controllerProps={controllerProps}
        />
      );
    }
    case DataType.Uuid: {
      return <UUIDInputWithPlaceholder controllerProps={controllerProps} />;
    }
    case DataType.LineString:
    case DataType.Point:
    case DataType.Polygon:
    case DataType.String: {
      return <FormInputText controllerProps={controllerProps} />;
    }
  }
};

export const getDefaultValueSchema = (type: DataType, key?: string) => {
  if (key === 'solver') {
    return y.string().uuid().default('');
  }
  if (key === 'contents') {
    return y.array(y.string().uuid().required()).default([]);
  }
  if (key === 'timeout') {
    return y.number().min(0).nullable();
  }
  switch (type) {
    case DataType.Boolean:
      return y.string().oneOf(['true', 'false']).allowEmptyString();
    case DataType.Timestamp:
    case DataType.Date:
      return y.string().nullable().default('');
    case DataType.Float:
      return y.number().nullable().default(null);
    case DataType.Int:
      return y.number().integer().nullable().default(null);
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
