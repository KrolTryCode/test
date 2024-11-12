import { applyTzOffset } from '~/utils/date/apply-tz-offset';

export function selectUserTimezone<T = Record<string, any>>(
  tz: string,
  data: T,
  applyOn: (keyof T)[],
): T {
  const newData = { ...data };

  applyOn.forEach(key => {
    if (newData[key] && typeof newData[key] === 'string') {
      newData[key] = applyTzOffset(newData[key] as string, tz) as T[keyof T];
    }
  });

  return newData;
}
