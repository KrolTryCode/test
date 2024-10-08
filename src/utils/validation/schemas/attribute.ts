import * as y from 'yup';

export interface AttributeValues<T = any> {
  attributeValues: Record<string, T>;
}

export const attributeValuesSchema = y.object().shape({
  attributeValues: y.lazy((obj: Record<string, any>) => {
    if (!obj) {
      return y.object().shape({});
    }
    return y.object().shape(
      Object.keys(obj).reduce(
        (schema, key) => {
          schema[key] = y.mixed();
          return schema;
        },
        {} as Record<string, y.Schema<any>>,
      ),
    );
  }),
});
