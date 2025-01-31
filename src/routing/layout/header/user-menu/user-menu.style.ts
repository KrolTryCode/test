import { styled, MenuItem, MenuItemProps } from '@mui/material';

export const StyledMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  width: '230px',
  padding: '10px 15px !important',
  borderLeft: '1px solid',
  borderRight: '1px solid',
  '&:first-of-type': {
    borderTop: `1px solid ${theme.palette.primary.main}`,
    borderTopLeftRadius: 'inherit',
    borderTopRightRadius: 'inherit',
  },

  '&:last-of-type': {
    borderBottomLeftRadius: 'inherit',
    borderBottomRightRadius: 'inherit',
  },

  borderColor: theme.palette.primary.main,
}));
