import { isPast, isValid } from 'date-fns';
import * as y from 'yup';

export const dateMinSchema = y.date().test({
  name: 'is-min-date',
  test: (date, ctx) => {
    const isValidDate = date instanceof Date && isValid(date);

    if (!isValidDate) {
      return ctx.createError({
        message: { key: 'yup:mixed.notType' },
      });
    }

    if (isPast(date)) {
      const currentDate = new Date();
      return ctx.createError({
        message: { key: 'yup:date.min', values: { min: currentDate.toLocaleString() } },
      });
    }

    return true;
  },
});
