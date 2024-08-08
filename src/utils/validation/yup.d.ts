import * as y from 'yup';

declare module 'yup' {
  interface Schema<TType = any, TContext = any, TDefault = any, TFlags extends Flags = ''>
    extends y.Schema<TType, TContext, TDefault, TFlags> {
    allowEmptyString(): Schema<TType, TContext, TDefault, TFlags>;
    getDefault(): TType;
  }
}

export {};
