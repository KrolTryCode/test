import { TZDate } from '@date-fns/tz';
import { isValid } from 'date-fns';

const tzRe = /(\+|-)\d{2}:\d{2}/;

export function getTz(stringWithTz = '') {
  const matches = stringWithTz.match(tzRe);
  if (matches) {
    return matches[0];
  }

  return '+00:00';
}

export function applyTzOffset(date: string, tz: string): string {
  if (!tzRe.test(tz)) {
    console.error(`Некорректная таймзона ${tz}`);
    return date;
  }

  let dateStr = date;
  const hasTz = tzRe.test(dateStr) || dateStr.endsWith('Z');

  if (!hasTz) {
    dateStr += 'Z';
  }

  const utc0Date = new Date(dateStr);

  if (isValid(utc0Date)) {
    const tzDateString = new TZDate(utc0Date, tz).toJSON();
    return tzDateString.replace(tzRe, '');
  }

  console.error(`Не получилось применить таймзону ${tz} к выбранной дате ${date}`);
  return date;
}
