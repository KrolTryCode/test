import { isPast } from 'date-fns';
import { t } from 'i18next';

export const validateMinDate = (passedDate: Date, minDate = new Date()) => {
  const hasError = isPast(passedDate);

  return hasError ? t('yup:date.min', { min: minDate.toLocaleString() }) : false;
};
