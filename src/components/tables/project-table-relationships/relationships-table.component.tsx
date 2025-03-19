import { Edit as EditIcon } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import {
  AddEntity,
  DataGrid,
  DeleteCellButton,
  EnhancedColDef,
  notifySuccess,
} from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { FC, useMemo, useState } from 'react';

import { getContentNodesByParentQueryOptions } from '~/api/queries/project-content/get-content-nodes-by-parent.query';
import { useCreateColumnLinkMutation } from '~/api/queries/tables/structure/create-column-link.mutation';
import { useDeleteColumnLinkMutation } from '~/api/queries/tables/structure/delete-column-link.mutation';
import { getTableOptions } from '~/api/queries/tables/structure/get-table.query';
import { TableColumnLinkType } from '~/api/utils/api-requests';
import { createRelationshipModal } from '~/components/forms/table-relationship/table-relationship-form.modal';
import { useCustomTranslations } from '~/utils/hooks';
import { showErrorMessage } from '~/utils/show-error-message';

interface RelationshipsTableProps {
  tableId: string;
  projectId: string;
}

interface TableRelationship {
  id: string;

  parentId: string;
  parentColumnName?: string;
  parentTable?: string;
  parentTableName?: string;

  childId: string;
  childColumnName?: string;
  childTable?: string;
  childTableName?: string;
}

export const RelationshipsTable: FC<RelationshipsTableProps> = ({ tableId, projectId }) => {
  const { t, getTableRelationshipTypesValueOptions, translateTableRelationshipTypes } =
    useCustomTranslations();
  const [swappedTableId, setSwappedTableId] = useState(tableId);

  const { data: tables = [], isSuccess } = useQuery(getContentNodesByParentQueryOptions(projectId));

  const { data: relationships = [], isLoading } = useQuery(
    getTableOptions(tableId, {
      enabled: isSuccess,
      select: data => {
        const currentTableName = tables.find(table => table.id === tableId)?.name;
        return data?.columns.reduce<TableRelationship[]>((all, column) => {
          const updated = [...all];
          if (column.childLink.length) {
            updated.push(
              ...column.childLink.map(l => ({
                ...l,
                childColumnName: column.displayName,
                childTable: column.tableId,
                childTableName: currentTableName,
              })),
            );
          }

          if (column.parentLinks.length) {
            updated.push(
              ...column.parentLinks.map(l => ({
                ...l,
                parentColumnName: column.displayName,
                parentTable: column.tableId,
                parentTableName: currentTableName,
              })),
            );
          }

          return updated;
        }, [] as TableRelationship[]);
      },
    }),
  );

  const createRelationship = () => {
    createRelationshipModal({
      title: t('ACTION.ADD', { type: t('ENTITY.RELATIONSHIP').toLowerCase() }),
      onSave: async data => {
        if (data.swapped) {
          setSwappedTableId(data.child.tableId);
        }
        await createColumnLink({
          type: data.type,
          parentColumnId: data.parent.id,
          columnId: data.child.id,
        });
      },
      projectId,
      tableId,
    });
  };

  const { mutateAsync: createColumnLink } = useCreateColumnLinkMutation(swappedTableId, tableId, {
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, t('ERROR.CREATION_FAILED')),
  });

  const { mutate: deleteColumnLink } = useDeleteColumnLinkMutation(tableId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const columns = useMemo<EnhancedColDef<TableRelationship>[]>(
    () => [
      {
        field: 'parentTable',
        headerName: t('TABLE_RELATIONSHIP.PARENT_TABLE'),
        width: 200,
        valueFormatter: (_, row) => row.parentTableName,
        groupingValueGetter: (_, row) => row.parentTableName,
      },
      {
        field: 'parentId',
        headerName: t('TABLE_RELATIONSHIP.PARENT_FIELD'),
        width: 200,
        valueFormatter: (_, row) => row.parentColumnName,
        groupingValueGetter: (_, row) => row.parentColumnName,
      },
      {
        field: 'childTable',
        headerName: t('TABLE_RELATIONSHIP.CHILD_TABLE'),
        width: 200,
        valueFormatter: (_, row) => row.childTableName,
        groupingValueGetter: (_, row) => row.childTableName,
      },
      {
        field: 'childId',
        headerName: t('TABLE_RELATIONSHIP.CHILD_FIELD'),
        width: 200,
        valueFormatter: (_, row) => row.childColumnName,
        groupingValueGetter: (_, row) => row.childColumnName,
      },
      {
        field: 'type',
        headerName: t('TABLE_RELATIONSHIP.TYPE'),
        type: 'singleSelect',
        width: 150,
        valueOptions: () =>
          getTableRelationshipTypesValueOptions(Object.values(TableColumnLinkType)),
        groupingValueGetter: translateTableRelationshipTypes,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 84,
        getActions({ row }) {
          return [
            <GridActionsCellItem
              key={'edit'}
              label={t('ACTION.EDIT', { type: t('ENTITY.FORM').toLowerCase() })}
              title={t('ACTION.EDIT', { type: t('ENTITY.FORM').toLowerCase() })}
              icon={<EditIcon />}
              color={'primary'}
              // onClick={console.log}
              disabled
            />,
            <DeleteCellButton
              key={'delete'}
              deleteHandler={() => deleteColumnLink({ columnId: row.childId, linkId: row.id })}
            />,
          ];
        },
      },
    ],
    [deleteColumnLink, getTableRelationshipTypesValueOptions, t, translateTableRelationshipTypes],
  );

  return (
    <DataGrid
      items={relationships}
      totalCount={relationships.length ?? 0}
      columns={columns}
      loading={isLoading}
      pinnedColumns={{ right: ['actions'] }}
      customToolbarContent={
        <AddEntity
          customText={t('ACTION.ADD', { type: t('ENTITY.RELATIONSHIP').toLowerCase() })}
          onClick={createRelationship}
        />
      }
    />
  );
};
