export interface AddModalProps<T = unknown> {
  id?: string;
  editing?: boolean;
  data?: T;
  onResolve: (id?: string) => void;
  onReject: () => void;
}
