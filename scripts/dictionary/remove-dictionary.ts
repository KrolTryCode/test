import * as fs from 'fs';
import { outputFilenameEN, outputFilenameBundle, outputFilenameRU } from './dictionary.utils';

try {
  fs.unlinkSync(outputFilenameRU);
  fs.unlinkSync(outputFilenameEN);
  fs.unlinkSync(outputFilenameBundle);
  console.info('Файлы .properties словарей удалены');
} catch {
  console.error('Файлы .properties словарей не найдены');
}
