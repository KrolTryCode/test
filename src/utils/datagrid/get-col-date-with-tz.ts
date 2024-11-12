import { TZDate } from '@date-fns/tz';
import { GridValidRowModel } from '@mui/x-data-grid-premium';
import { EnhancedColDef } from '@pspod/ui-components';
import i18n from 'i18next';

import { getCurrentUserTimezone } from '~/app/user/user.store';

import { applyTzOffset } from '../date/apply-tz-offset';

export function getColDateWithTz<R extends GridValidRowModel = GridValidRowModel>(
  date: string,
  _row: R,
  col: EnhancedColDef<R>,
): Date | string {
  const tz = getCurrentUserTimezone();
  if (date && typeof date === 'string') {
    const tzDateString = applyTzOffset(date, tz);
    return new TZDate(tzDateString).toLocaleString(i18n.language, col.dateTimeFormatOptions);
  }

  return date;
}
