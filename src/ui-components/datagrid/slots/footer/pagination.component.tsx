import { Pagination } from '@mui/material';
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';
import { FC } from 'react';

export const CustomGridPagination: FC<TablePaginationActionsProps> = ({
  page,
  count,
  onPageChange,
  className,
  rowsPerPage,
}) => {
  return (
    <Pagination
      page={page + 1}
      className={className}
      count={Math.ceil(count / rowsPerPage)}
      onChange={(e, newPage) =>
        onPageChange(e as React.MouseEvent<HTMLButtonElement, MouseEvent>, newPage - 1)
      }
    />
  );
};
