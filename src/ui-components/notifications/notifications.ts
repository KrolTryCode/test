import { enqueueSnackbar, OptionsObject } from 'notistack';

export const notifySuccess = (message: string, options?: OptionsObject<'success'>) =>
  enqueueSnackbar(message, { variant: 'success', ...options });

export const notifyError = (message: string, options?: OptionsObject<'error'>) =>
  enqueueSnackbar(message, { variant: 'error', ...options });

export const notifyInfo = (message: string, options?: OptionsObject<'info'>) =>
  enqueueSnackbar(message, { variant: 'info', ...options });

export const notifyWarning = (message: string, options?: OptionsObject<'warning'>) =>
  enqueueSnackbar(message, { variant: 'warning', ...options });
