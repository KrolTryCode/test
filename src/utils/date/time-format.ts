const dateFormatRU = 'dd.MM.yyyy';
const dateFormatEN = 'MM/dd/yyyy';
const dateTimeFormatRU = 'dd.MM.yyyy HH:mm';
const dateTimeFormatEN = 'MM/dd/yyyy HH:mm';

export const availableDateFormats: Record<string, string> = {
  ru: dateFormatRU,
  en: dateFormatEN,
};

export const availableDateTimeFormats: Record<string, string> = {
  ru: dateTimeFormatRU,
  en: dateTimeFormatEN,
};
