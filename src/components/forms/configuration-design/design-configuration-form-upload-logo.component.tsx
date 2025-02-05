import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FormUploadImage } from '~/components/react-hook-form';
import { FormUploadImageProps } from '~/components/react-hook-form/form-upload/form-upload-image.component';

import { useDesignConfigurationForm } from './use-design-configuration-form.hook';

// todo: рефакторинг ? пока вынесла, чтобы isUploading не затрагивал все логотипы в форме
export const DesignConfigurationFormUploadLogo: FC<Omit<FormUploadImageProps, 'handleUpload'>> = ({
  controllerProps,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const { onAttachLogoFile, isUploading } = useDesignConfigurationForm();

  return (
    <FormUploadImage
      size={200}
      withBorder
      variant={'rounded'}
      fit={'contain'}
      color={'secondary'}
      alt={t('ENTITY.LOGO')}
      isLoading={isUploading}
      handleUpload={async (file: File) => onAttachLogoFile(file, controllerProps.name)}
      controllerProps={controllerProps}
      onSuccess={onSuccess}
    />
  );
};
