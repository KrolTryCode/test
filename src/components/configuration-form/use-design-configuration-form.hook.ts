import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateApplicationFile } from '~/api/queries/design/create-application-file.mutation';
import { useGetColorPalettesQuery } from '~/api/queries/design/get-color-palettes.query';
import { useUploadFileMutation } from '~/api/queries/files/upload-file.mutation';
import { selectTranslatedColors } from '~/api/selectors/select-colors-with-translation';
import { showErrorMessage } from '~/utils/show-error-message';

type ResetField = (fieldName: string) => void;
type SetValue = (fieldName: string, value: any) => void;

export const useDesignConfigurationForm = (resetField: ResetField, setValue: SetValue) => {
  const { t } = useTranslation();

  const { mutateAsync: createApplicationFile } = useCreateApplicationFile({
    onError: e => showErrorMessage(e, 'ERROR.UPLOAD_FAILED'),
  });

  const { mutateAsync: uploadFile } = useUploadFileMutation();

  const { data: appColorsPalettes } = useGetColorPalettesQuery({
    select: pallet => selectTranslatedColors(pallet, t),
  });

  const onAttachLogoFile = useCallback(
    async (file: File | undefined, field: string) => {
      const type = field.includes('main') ? 'mainLogo' : 'loginLogo';
      if (file) {
        const { fileId } = await createApplicationFile({ type, originalName: file.name });
        await uploadFile({ file, fileId }, { onError: () => resetField(field) });
        setValue(field, fileId);
      }
    },
    [createApplicationFile, resetField, setValue, uploadFile],
  );

  return { onAttachLogoFile, appColorsPalettes };
};
