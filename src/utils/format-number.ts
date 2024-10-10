import roundToFixed from 'round-tofixed';

export function formatNumberNoTrailingZeros(number: unknown, precision = 2) {
  if (typeof number !== 'number') {
    return '';
  }

  return roundToFixed(number, precision);
}
