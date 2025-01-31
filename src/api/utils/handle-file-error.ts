import { AxiosError } from 'axios';

import { showErrorMessage } from '~/utils/show-error-message';

export function handleFileUploadingError(e: unknown) {
  if (e instanceof AxiosError && e.response?.status === 413) {
    showErrorMessage(e, 'FILES.ERROR.TOO_BIG');
  } else {
    showErrorMessage(e, 'FILES.UPLOAD_FAILED');
  }
}
