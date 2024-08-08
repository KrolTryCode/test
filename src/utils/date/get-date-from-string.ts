import { isValid } from 'date-fns';

export function getDateFromString(dateStr?: string): Date | null {
  return dateStr && isValid(new Date(dateStr)) ? new Date(dateStr) : null;
}
