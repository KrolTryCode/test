import { File } from '~/api/utils/api-requests';

export function createObjectURLFromFile(file: File | undefined) {
  if (file) {
    return URL.createObjectURL(file as Blob);
  }
  return;
}
