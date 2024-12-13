import { notifyError } from '@pspod/ui-components';
import { AxiosError } from 'axios';
import { TFunction } from 'i18next';

import { showErrorMessage } from '../show-error-message';

import { UploadFilesOptions } from './upload-files';

const validExtensions: Record<UploadFilesOptions['fileType'], string[]> = {
  excel: ['xlsx', 'xls'], // TODO:
  image: ['png', 'jpeg', 'jpg', 'webp'],
};

export function validateFileExtension(
  fileName: string,
  fileType: UploadFilesOptions['fileType'],
  t: TFunction,
) {
  const ext = fileName.split('.').at(-1)!.toLowerCase();
  if (!validExtensions[fileType].some(validExt => ext === validExt)) {
    notifyError(`${t('FILES.ERROR.WRONG_EXTENSION')}: ${ext}`);
    return false;
  }

  return true;
}

export function handleFileUploadingError(e: unknown) {
  if (e instanceof AxiosError && e.response?.status === 413) {
    showErrorMessage(e, 'FILES.ERROR.TOO_BIG');
  } else {
    showErrorMessage(e, 'FILES.UPLOAD_FAILED');
  }
}
