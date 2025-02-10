import { notifySuccess } from '@pspod/ui-components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useUploadFileMutation } from '~/api/queries/files/upload-file.mutation';
import { handleFileUploadingError } from '~/api/utils/handle-file-error';

export const useUploadFile = () => {
  const { t } = useTranslation();

  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFileMutation();

  const handleUploadFile = useCallback(
    async (getFileId: () => Promise<string>, file: File) => {
      try {
        const fileId = await getFileId();
        await uploadFile({ file, fileId });
        notifySuccess(t('FILES.UPLOAD_SUCCESS'));
        return fileId;
      } catch (e) {
        handleFileUploadingError(e);
        throw e;
      }
    },
    [t, uploadFile],
  );

  return { handleUpload: handleUploadFile, isUploading };
};
