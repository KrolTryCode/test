import {
  Image as ImageIcon,
  BackupTable as TableIcon,
  Archive as ArchiveIcon,
} from '@mui/icons-material';
import { Card, Skeleton, Stack } from '@mui/material';
import { FileCard, FileCardProps, UploadFileButton } from '@pspod/ui-components';

import { useGetImage } from '~/use-cases/get-image.hook';
import { fileTypeExtensions, FileType, validateSelectedFiles } from '~/utils/files/validate-files';

export type UploadValue<Multiple> = Multiple extends true ? File[] : File;

export interface UploadFileProps<Multiple extends boolean | undefined = false> {
  fileType: FileType;
  isMultiple?: Multiple;
  isDisabled?: boolean;
  isUploading?: boolean;
  fullWidth?: boolean;
  onSelect: (file: UploadValue<Multiple>) => void;
  onBlur?: () => void;
  files?: FileCardProps[];
  onDeleteFile?: (fileId: string) => void;
  onDownloadFile?: (fileId: string) => void;
}

export function UploadFile<Multiple extends boolean | undefined = false>({
  files,
  fileType,
  isUploading,
  isMultiple,
  onSelect,
  onDeleteFile,
  onDownloadFile,
  onBlur,
  ...buttonProps
}: UploadFileProps<Multiple>) {
  const handleSelect = (fileList: FileList) => {
    const files = validateSelectedFiles(Array.from(fileList), fileType);
    if (!isMultiple) {
      const file = files[0];
      onSelect(file as UploadValue<Multiple>);
    } else {
      onSelect(files as UploadValue<Multiple>);
    }
    onBlur?.();
  };

  const isLoading = isUploading && (!files?.length || (files.length === 1 && !isMultiple));

  return (
    <Card elevation={0} variant={'outlined'}>
      <UploadFileButton
        accept={fileTypeExtensions[fileType].join(', ')}
        onSelect={handleSelect}
        fullWidth
        variant={'text'}
        sx={theme => ({ paddingBlock: theme.spacing(1) })}
        isLoading={isLoading}
        isMultiple={isMultiple}
        {...buttonProps}
      />
      <Stack
        gap={0.5}
        borderTop={'1px solid'}
        borderColor={({ palette }) => (files?.length ? palette.divider : 'transparent')}
      >
        {isLoading ? (
          <Skeleton height={78} sx={{ transform: 'none' }} />
        ) : (
          files?.map(file => (
            <RenderFileCard
              key={file.id}
              file={file}
              fileType={fileType}
              onDeleteFile={onDeleteFile}
              onDownloadFile={onDownloadFile}
            />
          ))
        )}
      </Stack>
    </Card>
  );
}

function RenderFileCard({
  fileType,
  file,
  onDeleteFile,
  onDownloadFile,
}: Pick<UploadFileProps<false>, 'fileType' | 'onDeleteFile' | 'onDownloadFile'> & {
  file: FileCardProps;
}) {
  const isImage = fileType === 'image';
  const { image, isImageLoading } = useGetImage(isImage ? file.id : undefined);

  return (
    <FileCard
      key={file.id}
      {...file}
      CustomIcon={getCustomIcon(fileType)}
      preview={image?.src}
      isLoading={isImageLoading}
      onDelete={onDeleteFile}
      onDownload={onDownloadFile}
    />
  );
}

function getCustomIcon(fileType: FileType) {
  switch (fileType) {
    case 'image': {
      return ImageIcon;
    }
    case 'excel': {
      return TableIcon;
    }
    case 'zip': {
      return ArchiveIcon;
    }
  }
}
