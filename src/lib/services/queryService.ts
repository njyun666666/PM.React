import pmAPI from '../api/pmAPI';

export interface QueryModel<T> {
  filter: T;
  pageIndex: number;
  pageSize: number;
  sort?: string;
  desc?: boolean;
}

export interface QueryViewModel<T> {
  data: T;
  pageCount: number;
}

class QueryService {
  query<T, TResult>(api: string, data: QueryModel<T>) {
    return pmAPI
      .post<QueryViewModel<TResult[]>>(api, data)
      .then((data) => data.data)
      .catch(() => undefined);
  }
}

export const queryService = new QueryService();
