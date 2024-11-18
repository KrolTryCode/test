import { TZDate } from '@date-fns/tz';

import { getCurrentUserTimezone } from '~/app/user/user.store';

import { applyTzOffset } from '../date/apply-tz-offset';

export function getColDateWithTz(date: string): Date | string {
  const tz = getCurrentUserTimezone();
  if (date && typeof date === 'string') {
    const tzDateString = applyTzOffset(date, tz);
    return new TZDate(tzDateString);
  }

  return date;
}
