const NO_LETTER_REGEXP = /[^A-Za-zА-Яа-я]/g;

export function compareStringsNoSpecialChars(a?: string, b?: string) {
  const aToCompare = (a ?? '').replace(NO_LETTER_REGEXP, '');
  const bToCompare = (b ?? '').replace(NO_LETTER_REGEXP, '');
  return aToCompare.localeCompare(bToCompare);
}
