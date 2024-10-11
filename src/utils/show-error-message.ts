import { notifyError } from '@pspod/ui-components';
import { AxiosError, AxiosResponse } from 'axios';
import { t } from 'i18next';

export const showErrorMessageAsync = async (e: unknown, defaultMessage: string) => {
  let message = '';
  if (e instanceof AxiosError) {
    let errorObj = (e.response as AxiosResponse<{ message: string }>)?.data;

    if (errorObj && errorObj instanceof Blob) {
      errorObj = JSON.parse(await errorObj.text()) as { message: string };
    }
    message = errorObj.message;
  }

  notifyError(message ?? t(defaultMessage));
};

export const showErrorMessage = (e: unknown, defaultMessage: string) =>
  void showErrorMessageAsync(e, defaultMessage);
