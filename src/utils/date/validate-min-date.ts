import { isPast } from 'date-fns';
import { t } from 'i18next';

import { getCurrentUserTimezone } from '~/app/user/user.store';

import { applyTzOffset, applyTzOffsetToSystemDate } from './apply-tz-offset';

export const validateMinDate = (passedDate: Date) => {
  const date = applyTzOffsetToSystemDate(new Date(passedDate), getCurrentUserTimezone());
  const systemDate = new Date(date + 'Z');
  const hasError = isPast(systemDate);
  const currentDate = new Date(applyTzOffset(new Date().toJSON(), getCurrentUserTimezone()));

  return hasError ? t('yup:date.min', { min: currentDate.toLocaleString() }) : false;
};
