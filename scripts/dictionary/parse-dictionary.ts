import * as fs from 'fs';
import path from 'node:path';
import { outputFilenameEN, outputFilenameBundle, outputFilenameRU } from './dictionary.utils';

const globalPrefix = 'UI';
const inputRU = 'src/assets/dictionary/ru_RU.json';
const inputEN = 'src/assets/dictionary/en_US.json';

function convertJsonToProperties(obj: string[], prefix = '') {
  let properties = '';

  for (const key in obj) {
    const value = obj[key];
    const currentKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      properties += convertJsonToProperties(value, currentKey);
    } else {
      properties += `${globalPrefix}.${currentKey}=${value}\n`;
    }
  }

  return properties;
}

const jsonStringRU = fs.readFileSync(path.resolve(inputRU), 'utf8');
const jsonStringEN = fs.readFileSync(path.resolve(inputEN), 'utf8');
const jsonObjectRU = JSON.parse(jsonStringRU);
const jsonObjectEN = JSON.parse(jsonStringEN);
const propertiesStringRU = convertJsonToProperties(jsonObjectRU);
const propertiesStringEN = convertJsonToProperties(jsonObjectEN);
fs.writeFileSync(path.resolve(outputFilenameBundle), propertiesStringEN, 'utf8');
fs.writeFileSync(path.resolve(outputFilenameRU), propertiesStringRU, 'utf8');
fs.writeFileSync(path.resolve(outputFilenameEN), propertiesStringEN, 'utf8');

console.info('Словарь успешно обновлен');
