import { styled, Box, BoxProps, Drawer, DrawerProps } from '@mui/material';

export const StyledDrawer = (props: DrawerProps) => (
  <Drawer
    {...props}
    hideBackdrop
    ModalProps={{ sx: { top: '68px', width: '100%', height: 'calc(100vh - 68px)' } }}
    PaperProps={{
      square: true,
      sx: theme => ({
        width: 'inherit',
        height: 'inherit',
        backgroundColor: theme.palette.primary.main,
      }),
    }}
  />
);

export const StyledNavMenu = styled((props: BoxProps) => <Box component={'nav'} {...props} />)(
  ({ theme }) => ({
    height: 'fit-content',
    overflowY: 'auto',

    '& > *': {
      padding: theme.spacing(1.5),
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
    },

    a: {
      display: 'block',
      paddingInline: theme.spacing(1),
      marginBottom: 0,
      fontSize: theme.typography.h6['fontSize'],
      lineHeight: '2.5em',
      color: theme.palette.common.white,
      width: '100%',

      '&.active': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
      },
    },
  }),
);
