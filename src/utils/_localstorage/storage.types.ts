export interface StorageOperationParams {
  postfix?: string;
}

export interface StorageGetOperationParams<T> extends StorageOperationParams {
  defaultValue?: T;
}

export interface IStorageService<T> {
  get<K extends keyof T>(key: K, options?: StorageGetOperationParams<T[K]>): T[K] | null;

  set<K extends keyof T>(key: K, value: T[K], options?: StorageOperationParams): void;

  remove<K extends keyof T>(key: K, options?: StorageOperationParams): void;

  clear(): void;
}
