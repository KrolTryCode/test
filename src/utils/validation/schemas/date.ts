import { isPast, isValid } from 'date-fns';
import * as y from 'yup';

import { getCurrentUserTimezone } from '~/app/user/user.store';
import { applyTzOffset } from '~/utils/date/apply-tz-offset';

export const dateMinSchema = y.date().test({
  name: 'is-min-date',
  test: (date, ctx) => {
    const isValidDate = date instanceof Date && isValid(date);

    if (isValidDate && isPast(date)) {
      const currentDate = new Date(applyTzOffset(new Date().toJSON(), getCurrentUserTimezone()));
      return ctx.createError({
        message: { key: 'yup:date.min', values: { min: currentDate.toLocaleString() } },
      });
    }

    return true;
  },
});
