import { AxiosError } from 'axios';
import { t } from 'i18next';

import { notifyError } from '~/ui-components/notifications/notifications';

export const showErrorMessage = (e: unknown, defaultMessage: string) => {
  const message =
    e instanceof AxiosError && e.response?.data.message
      ? String(e.response?.data.message)
      : t(defaultMessage);
  notifyError(message);
};
