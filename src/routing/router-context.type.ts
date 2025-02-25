import { QueryClient } from '@tanstack/react-query';

export interface RouterContext {
  queryClient: QueryClient;
  title?: string;
}
