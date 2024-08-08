import * as y from 'yup';

import {
  IStorageService,
  StorageGetOperationParams,
  StorageOperationParams,
} from './storage.types';

export class StorageService<T> implements IStorageService<T> {
  constructor(
    private readonly storage: Storage,
    private readonly schemas: { [key in keyof T]: y.Schema<any> },
    private readonly prefix: string,
  ) {}

  set<K extends keyof T>(key: K, value: T[K], options?: StorageOperationParams): void {
    this.storage.setItem(this.createKey(key, options?.postfix), JSON.stringify(value));
  }

  get<K extends keyof T>(key: K, options?: StorageGetOperationParams<T[K]>): T[K] | null {
    const value = this.storage.getItem(this.createKey(key, options?.postfix));

    if (value === null || value === 'null' || value === undefined || value === 'undefined') {
      return options?.defaultValue ?? null;
    }

    if (!this.schemas[key].isValidSync(JSON.parse(value))) {
      this.remove(key, options);

      return options?.defaultValue ?? null;
    }

    return JSON.parse(value) as T[K];
  }

  remove<K extends keyof T>(key: K, options?: StorageOperationParams): void {
    this.storage.removeItem(this.createKey(key, options?.postfix));
  }

  clear(): void {
    const items = { ...localStorage };

    for (const item in items) {
      if (item.startsWith(this.prefix)) {
        this.storage.removeItem(item);
      }
    }
  }

  private createKey<K extends keyof T>(key: K, postfix?: string): string {
    if (postfix) {
      return `${this.prefix}${key.toString()}${postfix}`;
    }
    return this.prefix + key.toString();
  }
}
