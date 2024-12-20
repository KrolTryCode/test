export interface UploadFilesOptions {
  isMultiple: boolean;
  fileType: 'excel' | 'image';
}

export function uploadFiles(options: UploadFilesOptions) {
  return new Promise<FileList>(resolve => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('multiple', String(Boolean(options.isMultiple)));
    input.setAttribute('accept', mimeType[options.fileType]);

    input.onchange = e => {
      const files = (e.target as HTMLInputElement).files;
      if (files?.length) {
        resolve(files);
      }
    };

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  });
}

export const mimeType: Record<UploadFilesOptions['fileType'], string> = {
  excel:
    'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  image: 'image/png, image/jpeg, image/webp',
};
