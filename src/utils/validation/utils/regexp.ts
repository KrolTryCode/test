export const numberRe = new RegExp(/\d/);
export const uppercaseRe = new RegExp(/[A-Z]/);
export const lowercaseRe = new RegExp(/[a-z]/);
export const specialCharRe = new RegExp(/[!"#$%&'()*+,-./:;<=>?@[\\\]^_{|}~`]/);
export const getNRepetitionsRe = (n: number) => new RegExp(`(.)\\1{${n},}`, 'g');
export const noWhitespaceRe = new RegExp(/^[^\s]*$/);
export const emailRe = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/);
