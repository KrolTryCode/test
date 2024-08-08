export function selectSortedByLocale<T extends Record<string, any>, U extends keyof T>(
  data: T[],
  prop: U,
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return data.sort((a, b) => (a[prop] && b[prop] ? a[prop].localeCompare(b[prop]) : 0));
}
