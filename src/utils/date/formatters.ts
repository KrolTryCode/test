import { format } from 'date-fns';

export const dateOnlyISOFormat = "yyyy-MM-dd'T'00:00:00";
export const dateTimeISOFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS";

export function dateOnlyToISOString(date: Date = new Date()): string {
  return format(date, dateOnlyISOFormat);
}

export function dateTimeToISOString(date: Date = new Date()): string {
  return format(date, dateTimeISOFormat);
}
