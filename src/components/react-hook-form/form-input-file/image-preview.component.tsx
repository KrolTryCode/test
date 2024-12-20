import { Box } from '@mui/material';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { File } from '~/api/utils/api-requests';
import { createObjectURLFromFile } from '~/utils/files';

interface ImagePreviewProps {
  preview: File | undefined;
}

export const ImagePreview: FC<ImagePreviewProps> = ({ preview }) => {
  const { t } = useTranslation();

  const imageSrc = useMemo(() => createObjectURLFromFile(preview), [preview]);

  return (
    preview && (
      <Box>
        <img height={140} src={imageSrc} alt={t('COMMON.PREVIEW')} />
      </Box>
    )
  );
};
