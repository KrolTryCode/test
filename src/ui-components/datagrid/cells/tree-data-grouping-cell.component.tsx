import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Theme, Stack } from '@mui/material';
import {
  GridColDef,
  GridGroupingColDefOverride,
  GridRenderCellParams,
  GridValidRowModel,
  gridFilteredDescendantCountLookupSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid-premium';
import { FC } from 'react';

const groupStyles = {
  height: '100%',
  width: '100%',
  alignItems: 'center',
};

const getShiftStyles =
  (depth: number, isGroupRow = false) =>
  ({ palette }: Theme) => {
    const margin = 7;
    const width = depth * 4 + margin;

    return {
      margin: `${-margin}px`,
      height: `calc(100% + ${margin * 2}px)`,
      width: depth ? width : 0,
      backgroundColor: palette.grey[300],
      ...(isGroupRow && {
        width,
        backgroundColor: depth ? palette.grey[300] : 'transparent',
      }),
    };
  };

const TreeDataGroupingCell: FC<GridRenderCellParams> = ({ rowNode }: GridRenderCellParams) => {
  const apiRef = useGridApiContext();
  const filteredDescendantCountLookup = useGridSelector(
    apiRef,
    gridFilteredDescendantCountLookupSelector,
  );

  const filteredDescendantCount = filteredDescendantCountLookup[rowNode.id] ?? 0;

  if (rowNode.type !== 'group' || filteredDescendantCount <= 0) {
    return <Stack sx={getShiftStyles(rowNode.depth)} />;
  }

  const Icon = rowNode.childrenExpanded ? KeyboardArrowDownIcon : KeyboardArrowRightIcon;

  return (
    <Stack sx={groupStyles} gap={1} role={'button'} direction={'row'}>
      <Stack sx={getShiftStyles(rowNode.depth, true)} />
      <Icon fontSize={'small'} />
    </Stack>
  );
};

export function groupingColDef<T extends GridValidRowModel>(
  props: Partial<GridColDef<T>>,
): GridGroupingColDefOverride<T> {
  return {
    renderCell: params => <TreeDataGroupingCell {...params} />,
    cellClassName: ({ rowNode }) =>
      rowNode.type === 'group' && rowNode.childrenExpanded ? 'expanded' : '',
    ...props,
  };
}
