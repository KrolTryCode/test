// дабы не плодить варнингов экспортирую 1 раз здесь
// eslint-disable-next-line no-restricted-imports
export { tableDataLocalStorageService } from '~/utils/localstorage/table-data-storage/table-data-storage-instance';
// eslint-disable-next-line no-restricted-imports
export { TableDataStorageKey } from '~/utils/localstorage/table-data-storage/table-data-storage.types';

function replaceUUID(pathname: string) {
  const uuidRe = new RegExp(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, 'gi');
  return pathname.replaceAll(uuidRe, 'uuid');
}

export function getSavedPath(pathname: string, postfix = '', replaceUuid = true) {
  return `${replaceUuid ? replaceUUID(pathname) : pathname}:${postfix}`;
}
