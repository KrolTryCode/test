import { getNRepetitionsRe } from './regexp';

export const hasRepetitions = (string: string | number, count: number) =>
  getNRepetitionsRe(count).test(String(string));
