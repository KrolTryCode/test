import * as yup from 'yup';

// Define the objectOf function
export const objectOf = (schema: yup.Schema) => ({
  name: 'objectOf',
  exclusive: false,
  message: "Object values don't match the given schema",
  test: (value: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return value === null || Object.values(value).every((v: any) => schema.isValidSync(v));
  },
});
