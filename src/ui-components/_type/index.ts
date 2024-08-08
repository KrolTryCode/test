export type Size = 'small' | 'medium' | 'large';
export type Variant = 'filled' | 'outlined' | 'contained';
export type Color = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

/**
 * @overrides TS Extract utility type
 * @see https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union
 * */
export type Extract<T, U extends T> = T extends U ? T : never;

/**
 * @overrides TS Exclude utility type
 * @see https://www.typescriptlang.org/docs/handbook/utility-types.htmll#excludeuniontype-excludedmembers
 * */
export type Exclude<T, U extends T> = T extends U ? never : T;
