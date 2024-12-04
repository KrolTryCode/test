export function getFullName(
  first: string | undefined,
  last: string | undefined,
  sur: string | undefined,
) {
  let fullName = '';
  fullName += last ? last : '';
  fullName += first ? ` ${first}` : '';
  fullName += sur ? ` ${sur}` : '';

  return fullName.trim();
}
