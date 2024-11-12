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
    const someTz = '+02:30';
    const someDate = '2024-11-06T17:00:00';
    expect(applyTzOffset(someDate, someTz)).toBe('2024-11-06T19:30:00.000');

    const someDateWithTz = '2024-11-06T17:00:00-02:00';
    expect(applyTzOffset(someDateWithTz, someTz)).toBe('2024-11-06T21:30:00.000');

    const someTz2 = '+00:00';
    expect(applyTzOffset(someDateWithTz, someTz2)).toBe('2024-11-06T19:00:00.000');
  });

  test('applyTzOffset should return passed date string when tz or date is invalid', () => {
    const consoleMock = vi.spyOn(console, 'error');
    const wrongTz = '2:30';
    const someDate = '2024-11-06T17:00:00';
    expect(applyTzOffset(someDate, wrongTz)).toBe(someDate);
    expect(consoleMock).toHaveBeenCalledTimes(1);

    const someTz = '+02:30';
    const wrongDate = 'wrongDate';
    expect(applyTzOffset(wrongDate, someTz)).toBe(wrongDate);
    expect(consoleMock).toHaveBeenCalledTimes(2);

    consoleMock.mockRestore();
  });
});
