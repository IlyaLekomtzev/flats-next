export interface IFlatItem {
  id: number;
  project_title: string;
  rooms: number;
  studio: boolean;
  price: number;
  old_price: number;
  square: number;
  release_dates: string;
  floor: string;
  image: string;
}

export interface IFlatsResponseMeta {
  current_page: number;
  last_page: number;
  from: number;
  per_page: number;
  to: number;
  total: number;
  path: string | null;
  links: Array<{
    url: string | null;
    label: string | null;
    active: boolean;
  }>
}

export interface IFlatsResponse {
  data: IFlatItem[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  },
  meta: IFlatsResponseMeta;
}
