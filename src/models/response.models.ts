export interface ResponseBaseApiModel<T> {
  status: number;
  data: ResponseBaseApiItemModel<T>;
  code: number;
  message: string;
}

export interface ResponseBaseApiItemModel<T> {
  items: T;
  totals: number;
}

export interface ResponseBaseModel<T> {
  status: number;
  data: T;
  code: number;
  message: string;
}
