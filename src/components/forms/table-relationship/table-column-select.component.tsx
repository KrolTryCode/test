import { Stack } from '@mui/material';
import { Fieldset, FormItem } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { FC, HTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getContentNodesByParentQueryOptions } from '~/api/queries/project-content/get-content-nodes-by-parent.query';
import { getTableOptions } from '~/api/queries/tables/structure/get-table.query';
import { selectNodeColumns, TableColumnExtended } from '~/api/selectors/select-node-columns';
import { FormSelect } from '~/components/react-hook-form';

import { dataTypeIcons } from './data-type-icons';
import { ITableRelationshipForm } from './table-relationship-form.schema';

interface TableColumnSelectProps {
  projectId: string;
  tableId: string;
  type: 'parent' | 'child';
}

export const TableColumnSelect: FC<TableColumnSelectProps> = ({ projectId, tableId, type }) => {
  const { t } = useTranslation();
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ITableRelationshipForm>();

  const selectedTable = watch(`${type}.tableId`);

  const { data: tables = [], isLoading: isTableListLoading } = useQuery(
    getContentNodesByParentQueryOptions(projectId, undefined),
  );

  const { data: tableColumns = [], isLoading } = useQuery(
    getTableOptions(selectedTable, { enabled: !!selectedTable, select: selectNodeColumns }),
  );

  return (
    <Fieldset direction={'column'}>
      <FormItem label={t(`TABLE_RELATIONSHIP.${type.toUpperCase()}_TABLE`)}>
        <FormSelect
          items={
            selectedTable === tableId
              ? tables.filter(v => v.id === tableId)
              : tables.filter(v => v.id !== tableId)
          }
          error={!!errors[type]?.['id'] && !selectedTable}
          isDisabled={isTableListLoading}
          isReadonly={selectedTable === tableId}
          controllerProps={{ ...register(`${type}.tableId`), control }}
          onChange={value => {
            if (!value) {
              setValue(`${type}.id`, '', { shouldValidate: true });
              setValue(`${type}.type`, null, { shouldValidate: true });
            }
            return value;
          }}
        />
      </FormItem>
      <FormItem
        label={t(`TABLE_RELATIONSHIP.${type.toUpperCase()}_FIELD`)}
        isDisabled={!selectedTable || isLoading}
      >
        <FormSelect
          items={tableColumns}
          valueExpr={'id'}
          displayExpr={'displayName'}
          isDisabled={!selectedTable || isLoading}
          controllerProps={{ ...register(`${type}.id`), control }}
          renderOption={renderOption}
        />
      </FormItem>
    </Fieldset>
  );
};

function renderOption(props: HTMLAttributes<HTMLLIElement>, option: TableColumnExtended) {
  const Icon = dataTypeIcons[option.type];

  return (
    <Stack direction={'row'} gap={1} component={'li'} {...props}>
      {Icon && (
        <Icon
          fontSize={'small'}
          sx={theme => ({
            border: '1px solid',
            borderColor: theme.palette.divider,
            borderRadius: `${theme.shape['borderRadius']}px`,
          })}
        />
      )}
      {option['displayName']}
    </Stack>
  );
}
