import { useMemo } from 'react';

export function useFlatRows(rows: Record<string, unknown>[]): Record<string, unknown>[] {
  return useMemo(() => rows.map(row => _flattenObject(row)), [rows]);
}

export function _flattenObject(object: Record<string, unknown>): Record<string, unknown> {
  const entries = Object.entries(object);

  for (const [key, value] of entries) {
    if (typeof value === 'object' && value !== null) {
      const flattenInner = _flattenObject(value as Record<string, unknown>);
      const flattenEntries = Object.entries(flattenInner);
      const withMappedKeys = flattenEntries.map<[string, unknown]>(([innerKey, value]) => [
        `${key}.${innerKey}`,
        value,
      ]);

      entries.push(...withMappedKeys);
    }
  }

  return Object.fromEntries(entries);
}
