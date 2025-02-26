import { LocaleObject, Message } from 'yup';

interface Messages extends LocaleObject {
  custom: Message;
}

const messages: Messages = {
  mixed: {
    default: 'Содержит ошибку',
    required: 'Обязательное поле',
    defined: 'Обязательное поле',
    notNull: 'Обязательное поле',
    oneOf: 'Поле должно содержать одно из следующих значений: {{values}}',
    notOneOf: 'Поле не должно содержать следующие значения: {{values}}',
    notType: 'Неверный ввод',
  },
  string: {
    length: 'Строка должна содержать ровно {{length}} символ(ов)',
    min: 'Строка должна содержать не менее {{min}} символа(ов)',
    max: 'Строка должна содержать не более {{max}} символа(ов)',
    matches: 'Строка должна соответствовать формату {{regex}}',
    trim: 'Строка не должна содержать пробелы в начале или в конце',
    lowercase: 'Строка должна содержать заглавные буквы',
    uppercase: 'Строка должна содержать строчные буквы',
    email: 'Неверный e-mail',
    url: 'Неверная ссылка',
    uuid: 'Неверный UUID',
  },
  number: {
    min: 'Число должно быть больше или равно {{min}}',
    max: 'Число должно быть меньше или равно {{max}}',
    lessThan: 'Число должно быть меньше чем {{less}}',
    moreThan: 'Число должно быть больше {{more}}',
    positive: 'Число должно быть положительным',
    negative: 'Число должно быть отрицательным',
    integer: 'Ожидается целое число',
  },
  date: {
    min: 'Дата не может быть меньше {{min}}',
    max: 'Дата не может быть меньше {{max}}',
  },
  boolean: {
    isValue: 'Поле должно иметь значение: {{value}}',
  },
  object: {
    noUnknown: '{{path}} не может иметь ключи, не указанные в форме объекта',
  },
  array: {
    min: 'Поле должно содержать минимум {{min}} элемент(ов)',
    max: 'Поле должно содержать не более {{max}} элемент(ов)',
    length: 'Поле должно содержать ровно {{maximum}} элемента(ов)',
  },
  tuple: {
    notType: 'Неверный ввод',
  },
  custom: {
    phone: 'Некорректный номер телефона',
    passwordMismatch: 'Пароли не совпадают',
    fileRequired: 'Необходимо выбрать файл',
  },
};

// eslint-disable-next-line import/no-default-export
export default messages;
