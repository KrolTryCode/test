import { Box, Checkbox, FormControlLabel, List, ListItem, Typography } from '@mui/material';
import {
  GridColumnGroupingModel,
  GridColumnNode,
  isLeaf,
  useGridApiContext,
} from '@mui/x-data-grid-premium';
import { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ColumnAndGroup } from '~/ui-components/datagrid/slots/toolbar/columns-panel/columns-panel.component';

interface GroupWithChildren {
  groupId?: string;
  groupName?: string;
  children: (GroupWithChildren | { field: string })[];
}

export const ColumnsList: FC<{
  columnGroupingModel: GridColumnGroupingModel;
  filteredColumns: ColumnAndGroup[];
}> = ({ columnGroupingModel, filteredColumns }) => {
  const { t } = useTranslation();
  const { current: gridApi } = useGridApiContext();
  const visibleColumns = gridApi.getVisibleColumns();

  const alreadyRenderedColumns: ColumnAndGroup[] = [];

  const columnsGroupsArray = useMemo(() => {
    const buildColumnsPaths = () => {
      const paths: { [key: string]: GroupWithChildren } = {};

      const processColumn = (column: GridColumnNode, parentPath?: GroupWithChildren) => {
        if (isLeaf(column)) {
          if (parentPath) {
            parentPath.children.push({ field: column.field });
          }
        } else {
          const currentGroup: GroupWithChildren = {
            groupId: column.groupId,
            groupName: column.headerName,
            children: [],
          };

          if (parentPath) {
            parentPath.children.push(currentGroup);
          } else {
            paths[column.groupId] = currentGroup;
          }

          column.children.forEach(child => {
            processColumn(child, currentGroup);
          });
        }
      };

      columnGroupingModel.forEach(column => {
        processColumn(column);
      });

      return paths;
    };

    return buildColumnsPaths();
  }, [columnGroupingModel]);

  const setColumnVisibility = useCallback(
    (columnField: string, isVisible: boolean) =>
      gridApi.setColumnVisibility(columnField, isVisible),
    [gridApi],
  );

  const getColumnByField = (field: string) => filteredColumns.find(e => e.field === field);

  const renderCheckboxWithLabel = (field: string) => {
    const column = getColumnByField(field);
    alreadyRenderedColumns.push(column!);
    if (column?.headerName === undefined) {
      return null;
    }

    return (
      <FormControlLabel
        key={column.headerName}
        sx={{ padding: '2px', display: 'flex' }}
        control={
          <Checkbox
            checked={
              visibleColumns.some(col => column.field === col.field) || column.hideable === false
            }
            disabled={column.hideable === false}
            onChange={event => setColumnVisibility(column.field, event.target.checked)}
          />
        }
        label={column.headerName}
      />
    );
  };

  // Функция проверяет, имеется ли хотя бы один столбец у группы (необходимо для поиска по столбцам, чтобы не отображать пустые группы)
  const hasFilteredChildren = (group: GroupWithChildren): boolean => {
    return group.children.some(child => {
      if ('field' in child) {
        return filteredColumns.some(column => column.field === child.field);
      } else {
        return hasFilteredChildren(child);
      }
    });
  };

  const renderGroupName = (group: GroupWithChildren) => {
    if (hasFilteredChildren(group)) {
      return (
        <Typography variant={'body2'} fontWeight={theme => theme.typography.fontWeightBold}>
          {group.groupName}:
        </Typography>
      );
    }
  };

  const renderGroupAndChildren = (element: GroupWithChildren, paddingOffset = 0) => {
    return (
      <Box key={element.groupId} paddingLeft={`${paddingOffset}em`}>
        {renderGroupName(element)}
        {element.children.map(child => {
          if ('field' in child) {
            // если не группа
            return renderCheckboxWithLabel(child.field);
          } else {
            // если группа
            return renderGroupAndChildren(child, paddingOffset + 1);
          }
        })}
      </Box>
    );
  };

  const renderGroup = (columnGroup: string[]) => {
    const mainGroupOfColumn = columnGroup.at(0)!;
    const allGroups = columnsGroupsArray[mainGroupOfColumn];
    return renderGroupAndChildren(allGroups);
  };

  if (filteredColumns.length === 0) {
    return (
      <Box display={'flex'} justifyContent={'center'} paddingBottom={'18px'}>
        <Typography>{t('MESSAGE.NO_DATA')}</Typography>
      </Box>
    );
  }

  return (
    <Box paddingInline={3} maxWidth={'500px'}>
      <List>
        {filteredColumns.map(column => {
          if (!alreadyRenderedColumns.includes(column)) {
            const hasGroup = column.columnGroups.length !== 0;

            return (
              <ListItem key={column.field} sx={{ padding: 0 }}>
                {!hasGroup ? (
                  renderCheckboxWithLabel(column.field)
                ) : (
                  <Box paddingInlineStart={4}>{renderGroup(column.columnGroups)}</Box>
                )}
              </ListItem>
            );
          }
        })}
      </List>
    </Box>
  );
};
