import { Card, Skeleton, Stack } from '@mui/material';
import { FileCard, FileCardProps, UploadFileButton, UploadDndButton } from '@pspod/ui-components';

import { useGetImage } from '~/use-cases/get-image.hook';
import { fileTypeExtensions, FileType, validateSelectedFiles, getFileIcon } from '~/utils/files';

export type UploadValue<Multiple> = Multiple extends true ? File[] : File;

export interface UploadFileProps<Multiple extends boolean | undefined = false> {
  fileType: FileType;
  isMultiple?: Multiple;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isUploading?: boolean;
  fullWidth?: boolean;
  variant?: 'dragger' | 'button';
  draggerDescr?: string;
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
  isInvalid,
  variant = 'button',
  onSelect,
  onDeleteFile,
  onDownloadFile,
  onBlur,
  draggerDescr,
  ...buttonProps
}: UploadFileProps<Multiple>) {
  const handleSelect = (fileList: File[]) => {
    const files = validateSelectedFiles(fileList, fileType);
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
    <Card elevation={0} variant={variant === 'button' ? 'outlined' : 'elevation'}>
      <Stack
        borderBottom={variant === 'button' ? '1px solid' : 'none'}
        borderColor={({ palette }) => (files?.length ? palette.divider : 'transparent')}
        marginBottom={variant === 'button' ? 0 : 1}
      >
        {variant === 'dragger' && (
          <UploadDndButton
            accept={fileTypeExtensions[fileType].join(', ')}
            onSelect={handleSelect}
            isMultiple={isMultiple}
            description={draggerDescr}
            isInvalid={isInvalid}
          />
        )}
        {variant === 'button' && (
          <UploadFileButton
            accept={fileTypeExtensions[fileType].join(', ')}
            onSelect={handleSelect}
            fullWidth
            variant={'text'}
            isInvalid={isInvalid}
            sx={theme => ({ paddingBlock: theme.spacing(1) })}
            isLoading={isLoading}
            isMultiple={isMultiple}
            {...buttonProps}
          />
        )}
      </Stack>
      <Stack gap={0.5}>
        {isLoading ? (
          <Skeleton height={78} sx={{ transform: 'none' }} />
        ) : (
          files?.map(file => (
            <RenderFileCard
              key={file.id}
              fileType={fileType}
              onDelete={onDeleteFile ? () => onDeleteFile(file.id!) : file.onDelete}
              onDownload={onDownloadFile ? () => onDownloadFile(file.id!) : file.onDownload}
              {...file}
              variant={variant === 'button' ? 'contained' : 'outlined'}
            />
          ))
        )}
      </Stack>
    </Card>
  );
}

interface RenderFileCardProps extends FileCardProps {
  fileType: UploadFileProps<false>['fileType'];
}

function RenderFileCard({ fileType, ...file }: RenderFileCardProps) {
  const isImage = fileType === 'image';
  const { image, isImageLoading } = useGetImage(isImage ? file.id : undefined);

  return (
    <FileCard
      {...file}
      CustomIcon={getFileIcon(fileType)}
      preview={image?.src}
      isPreviewLoading={isImageLoading}
    />
  );
}
