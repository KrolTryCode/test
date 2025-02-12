import { isPast, isValid } from 'date-fns';
import * as y from 'yup';

// date() не подходит, т.к. кидает ошибку, которую нельзя локализовать(?), сразу при вводе 1-го символа
export const dateMinSchema = y.mixed().test({
  name: 'is-min-date',
  test: (date, ctx) => {
    const isValidDate = date instanceof Date && isValid(date);

    if (date && !isValidDate) {
      return ctx.createError({
        message: { key: 'yup:mixed.notType' },
      });
    }

    if (isValidDate && isPast(date)) {
      const currentDate = new Date();
      return ctx.createError({
        message: { key: 'yup:date.min', values: { min: currentDate.toLocaleString() } },
      });
    }

    return true;
  },
}) as y.DateSchema;
