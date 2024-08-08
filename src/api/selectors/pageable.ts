interface PageableResponse<T> {
  content?: T[];
  totalElements?: number;
}

export function selectPageableData<T>(data: PageableResponse<T>) {
  return { items: data.content ?? [], totalCount: data.totalElements ?? 0 };
}
