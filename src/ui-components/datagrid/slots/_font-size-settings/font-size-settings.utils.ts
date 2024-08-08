import {
  getSavedPath,
  tableDataLocalStorageService,
  TableDataStorageKey,
} from '../../helpers/local-storage';

export function getFontSizeFromLS(pathname: string = '', postfix: string = '') {
  const path = getSavedPath(pathname, postfix);
  return tableDataLocalStorageService.get(TableDataStorageKey.FontSize, { postfix: path });
}
