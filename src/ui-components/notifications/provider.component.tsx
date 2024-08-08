import { styled } from '@mui/material';
import { MaterialDesignContent, SnackbarProvider, SnackbarProviderProps } from 'notistack';
import { FC, JSXElementConstructor } from 'react';

const StyledMaterialDesignContent = styled(MaterialDesignContent)(({ theme }) => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: theme.palette.success.main,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: theme.palette.error.main,
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: theme.palette.info.main,
  },
  '&.notistack-MuiContent-warning': {
    backgroundColor: theme.palette.warning.main,
  },
}));

const Components: SnackbarProviderProps['Components'] = {
  success: StyledMaterialDesignContent,
  error: StyledMaterialDesignContent,
  info: StyledMaterialDesignContent,
  warning: StyledMaterialDesignContent,
};

const snackbarAnchorOrigin: SnackbarProviderProps['anchorOrigin'] = {
  horizontal: 'center',
  vertical: 'bottom',
};

interface NotificationsProviderProps {
  CustomComponents?: Record<string, JSXElementConstructor<any>>;
}

export const NotificationsProvider: FC<NotificationsProviderProps> = ({
  CustomComponents = {},
}) => (
  <SnackbarProvider
    autoHideDuration={2000}
    anchorOrigin={snackbarAnchorOrigin}
    Components={{ ...Components, ...CustomComponents }}
  />
);
