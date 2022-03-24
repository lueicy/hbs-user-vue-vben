export interface BasicPageParams {
  // page: number;
  pageIndex: number;
  pageSize: number;
}

export interface BasicFetchResult<T extends any> {
  items: T[];
  total: number;
}
