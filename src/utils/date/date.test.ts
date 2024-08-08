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
});
