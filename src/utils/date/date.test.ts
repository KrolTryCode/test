import { applyTzOffset } from './apply-tz-offset';
import { getDateFromString } from './get-date-from-string';

describe('DateTime utils', () => {
  test('getDateFromString should return date from valid datestring', () => {
    const dateStr = '2024-12-31';
    expect(getDateFromString(dateStr)).toBeInstanceOf(Date);
    expect(getDateFromString(dateStr)?.getTime()).toBe(1735603200000);
  });

  test('getDateFromString should return null from invalid datestring', () => {
    const dateStr = '2024-33-31';
    expect(getDateFromString(dateStr)).toBe(null);
    expect(getDateFromString()).toBe(null);
  });

  test('applyTzOffset should return date string with timezone offset applied', () => {
    const someTz = 'Australia/Eucla'; // +08:45
    const someDate = '2024-11-06T17:00:00';
    expect(applyTzOffset(someDate, someTz)).toBe('2024-11-07T01:45:00.000');

    const someDateWithTz = '2024-11-06T17:00:00-02:00';
    expect(applyTzOffset(someDateWithTz, someTz)).toBe('2024-11-07T03:45:00.000');

    const someTz2 = 'Atlantic/Reykjavik'; // +00:00
    expect(applyTzOffset(someDateWithTz, someTz2)).toBe('2024-11-06T19:00:00.000');
  });

  test('applyTzOffset should return passed date string when date is invalid', () => {
    const consoleMock = vi.spyOn(console, 'error');

    const someTz = '+02:30';
    const wrongDate = 'wrongDate';
    expect(applyTzOffset(wrongDate, someTz)).toBe(wrongDate);
    expect(consoleMock).toHaveBeenCalledTimes(1);

    consoleMock.mockRestore();
  });
});
