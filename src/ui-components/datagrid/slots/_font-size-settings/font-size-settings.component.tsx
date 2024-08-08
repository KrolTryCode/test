import { useGridApiContext } from '@mui/x-data-grid-premium';
import { FC, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  DropdownMenu,
  DropdownMenuProps,
} from '~/ui-components/dropdown-menu/dropdown-menu.component';

import {
  getSavedPath,
  tableDataLocalStorageService,
  TableDataStorageKey,
} from '../../helpers/local-storage';

import { FontSizeItem } from './font-size-item.component';
import { DEFAULT_FONT_SIZE } from './font-size-settings.consts';
import { getFontSizeFromLS } from './font-size-settings.utils';

const dropdownProps: DropdownMenuProps = {
  disablePortal: true,
  buttonSize: 'medium',
  anchorOrigin: { vertical: 'top', horizontal: 'left' },
  transformOrigin: { vertical: 'bottom', horizontal: 'left' },
  transitionDuration: { appear: 200, enter: 200, exit: 0 },
  closeOnClick: false,
};

interface FontSizeSettingsProps {
  gridId?: string;
}

export const FontSizeSettings: FC<FontSizeSettingsProps> = ({ gridId }) => {
  const { t } = useTranslation();
  const gridApi = useGridApiContext();
  const gridElement = gridApi.current.rootElementRef.current;

  const applyFontSize = useCallback(
    (fs: number | string | null) => {
      if (!fs || !gridElement?.style) {
        return;
      }

      gridElement.style.fontSize = `${fs}px`;
      if (fs === DEFAULT_FONT_SIZE) {
        tableDataLocalStorageService.remove(TableDataStorageKey.FontSize, {
          postfix: getSavedPath(window.location.pathname, gridId),
        });
      } else {
        tableDataLocalStorageService.set(
          TableDataStorageKey.FontSize,
          Number(fs) ?? DEFAULT_FONT_SIZE,
          {
            postfix: getSavedPath(window.location.pathname, gridId),
          },
        );
      }
    },
    [gridElement?.style, gridId],
  );

  useEffect(() => {
    const fs = getFontSizeFromLS(window.location.pathname, gridId);
    applyFontSize(fs);
  }, [applyFontSize, gridId]);

  return (
    <DropdownMenu {...dropdownProps} buttonContent={t('COMMON.FONT_SIZE')}>
      <FontSizeItem
        label={t('COMMON.CURRENT', { what: t('ENTITY.TABLE').toLowerCase() })}
        applyFontSize={applyFontSize}
        gridElement={gridElement}
      />
    </DropdownMenu>
  );
};
