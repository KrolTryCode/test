import { notifyError } from '@pspod/ui-components';
import { t } from 'i18next';

export type FileType = 'excel' | 'image' | 'zip';

export const fileTypeExtensions: Record<FileType, string[]> = {
  excel: ['.xlsx', '.xls'],
  image: ['.png', '.jpeg', '.jpg', '.webp'],
  zip: ['.zip'],
};

export const getAvailableExtensionsMsg = (fileType: FileType) => {
  return `${t('FILES.AVAILABLE_EXTENSIONS')}: ${fileTypeExtensions[fileType].join(', ')}`;
};

export function validateSelectedFiles(files: File[], fileType: FileType): File[] {
  if (!files?.length) {
    return [];
  }

  const extensions = fileTypeExtensions[fileType];
  const { validFiles, invalidFiles } = validateFiles(files, extensions);
  if (invalidFiles.length) {
    showExtensionErrorMessage(invalidFiles);
  }

  return validFiles;
}

function showExtensionErrorMessage(files: File[]) {
  const isMultiple = files.length > 1;
  if (isMultiple) {
    const fileNames = files.map(file => `${file.name}: .${file.name.split('.').at(-1)!}`);
    notifyError(`${t('FILES.ERROR.WRONG_EXTENSION')} ${fileNames.join('; ')}`);
  } else {
    notifyError(`${t('FILES.ERROR.WRONG_EXTENSION')}: .${files[0].name.split('.').at(-1)}`);
  }
}

function validateFiles(files: File[], extensions: string[]) {
  const invalidFiles: File[] = [];
  const validFiles: File[] = [];

  files.forEach(file => {
    const ext = '.' + file.name.split('.').at(-1)!.toLowerCase();
    if (extensions.length && !extensions.includes(ext)) {
      invalidFiles.push(file);
    } else {
      validFiles.push(file);
    }
  });

  return { invalidFiles, validFiles };
}
