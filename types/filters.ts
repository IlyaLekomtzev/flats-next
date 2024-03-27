export interface IFiltersProject {
  id: number;
  title: string;
  is_active: boolean;
  disabled: boolean;
}

export interface IFiltersRoom {
  number: number;
  is_active: boolean;
  disabled: boolean;
}

export interface IFiltersRange {
  min_range: number;
  max_range: number;
  min: number;
  max: number;
}

export interface IFiltersResponseData {
  projects: IFiltersProject[];
  rooms: IFiltersRoom[];
  price: IFiltersRange;
  square: IFiltersRange;

}

export interface IFiltersResponse {
  data: IFiltersResponseData;
}

export interface IFiltersRequest {
  f?: {
    projects?: number[];
    rooms?: number[];
    square?: {
      min?: number;
      max?: number;
    },
    price?: {
      min?: number;
      max?: number;
    }
  },
  sort?: {
    square?: string;
    price?: string;
  },
  per_page?: number;
  page?: number;
}

export interface IFilterValues {
  projects?: number[];
  rooms?: number[];
  price?: [number, number];
  square?: [number, number];
  per_page?: number;
}
