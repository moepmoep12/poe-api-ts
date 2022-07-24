import { Option, Sort } from "../../Query";

export interface ExchangeQueryContainer {
  query: ExchangeQuery;
  sort?: Sort;
  engine?: "new";
}

export interface ExchangeQuery {
  status: Option;
  have: string[];
  want: string[];
  minimum?: number;
  account?: string;
  fulfillable?: null;
}
