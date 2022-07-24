import { QueryFilters, Sort, StatSort, Option, StatFilter } from "../../Query";

export interface SearchQueryContainer {
  query: SearchQuery;
  sort?: Sort | StatSort;
}

export interface SearchQuery {
  status?: Option;
  name?: string;
  type?: string;
  stats?: StatFilter[];
  filters?: QueryFilters;
  term?: string;
}
