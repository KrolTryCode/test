import { yupResolver } from '@hookform/resolvers/yup';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { Button, Fieldset, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { FC, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { InstanceProps } from 'react-modal-promise';

import { TableColumnLinkType } from '~/api/utils/api-requests';
import { FormSelect } from '~/components/react-hook-form';
import { useCustomTranslations } from '~/utils/hooks';

import { TableColumnSelect } from './table-column-select.component';
import { ColumnInfo, ITableRelationshipForm, schema } from './table-relationship-form.schema';

export interface TableRelationshipFormProps
  extends Pick<InstanceProps<ITableRelationshipForm, unknown>, 'onResolve' | 'onReject'> {
  projectId: string;
  tableId: string;
  onSave: (data: ITableRelationshipForm) => Promise<void>;
}

export const TableRelationshipForm: FC<TableRelationshipFormProps> = ({
  projectId,
  tableId,
  onSave,
  onResolve,
  onReject,
}) => {
  const { t, translateTableRelationshipTypes } = useCustomTranslations();

  const methods = useForm<ITableRelationshipForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { ...schema.getDefault(), child: { ...schema.getDefault().child, tableId } },
    resolver: yupResolver(schema),
  });
  const {
    register,
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, isSubmitted },
  } = methods;

  const swapValues = useCallback(() => {
    const vals = getValues();
    const childDataCopy = Object.assign<ColumnInfo, unknown>(vals.child, {});
    const parentDataCopy = Object.assign<ColumnInfo, unknown>(vals.parent, {});
    reset(
      { parent: childDataCopy, child: parentDataCopy, type: vals.type, swapped: !vals.swapped },
      { keepSubmitCount: true },
    );
  }, [getValues, reset]);

  const onSubmit = (data: ITableRelationshipForm) => {
    void onSave(data).then(() => onResolve());
  };

  return (
    <FormProvider {...methods}>
      <Form showColonAfterLabel isRequired onSubmit={handleSubmit(onSubmit)}>
        <Fieldset>
          <TableColumnSelect projectId={projectId} tableId={tableId} type={'parent'} />
          <Fieldset direction={'column'} sx={{ justifyContent: 'flex-end' }}>
            <FormItem>
              <Button
                variant={'text'}
                size={'large'}
                color={'secondary'}
                fullWidth
                icon={<SwapHorizIcon />}
                onClick={swapValues}
                sx={{
                  '&:hover, &:focus-visible': { outline: '1px solid', outlineColor: 'divider' },
                }}
              />
            </FormItem>
            <FormItem label={t('TABLE_RELATIONSHIP.TYPE')}>
              <FormSelect
                items={Object.values(TableColumnLinkType)}
                translateItemsFunction={translateTableRelationshipTypes}
                controllerProps={{ ...register('type'), control }}
              />
            </FormItem>
          </Fieldset>
          <TableColumnSelect projectId={projectId} tableId={tableId} type={'child'} />
        </Fieldset>
        <FormButtons>
          <Button onClick={onReject} color={'primary'}>
            {t('ACTION.CANCEL')}
          </Button>
          <Button
            type={'submit'}
            disabled={!isValid && isSubmitted}
            variant={'contained'}
            color={'primary'}
          >
            {t('ACTION.SAVE')}
          </Button>
        </FormButtons>
      </Form>
    </FormProvider>
  );
};
