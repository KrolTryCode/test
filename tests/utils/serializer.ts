import { SnapshotSerializer } from 'vitest';

const idArray: string[] = [];

const DX_UUID_REGEX = /dx-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

export default {
  test: (val?: unknown): boolean => {
    if (typeof val !== 'string') {
      return false;
    }
    return DX_UUID_REGEX.test(val);
  },
  print: (val: unknown): string => {
    const value = val as string;
    let index = idArray.indexOf(value);
    if (index === -1) {
      idArray.push(value);
      index = idArray.length - 1;
    }
    return `"dx_dx-${index}"`;
  },
} satisfies SnapshotSerializer;
