import * as y from 'yup';

export const OKPOSchema = y.string().test({
  name: 'is-valid-okpo',
  test: (okpo, ctx) => {
    if (okpo && !/^\d+$/.test(okpo)) {
      return ctx.createError({ message: { key: 'yup:mixed.notType' } });
    } else if (okpo && ![8, 10].includes(okpo.length)) {
      return ctx.createError({ message: { key: 'yup:custom.okpo' } });
    }

    return true;
  },
});
