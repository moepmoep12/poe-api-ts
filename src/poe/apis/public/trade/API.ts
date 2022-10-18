import { buildURL, requestTransformed } from "../../../../common/functions";

import { Language } from "../../../shared";
import { TradeItemGroup } from "../../../shared/trade/items";

import { TradeLeague } from "../../../shared/trade/leagues";
import { ExchangeQueryContainer, ExchangeResults } from "../../../shared/trade/query/exchange";
import { FetchResult } from "../../../shared/trade/query/fetch";
import { SearchQueryContainer, SearchResult } from "../../../shared/trade/query/search";

import { Group } from "../../../shared/trade/static";
import { StatGroup } from "../../../shared/trade/stats";

import { KoreanTradeEndpoints, PublicEndpoints } from "../Endpoints";
import { TradeFetchResponse } from "./fetch/Response";
import { TradeItemsResponse } from "./items/Response";
import { TradeLeagueResponse } from "./leagues/Response";
import { TradeSearchResult } from "./search/SearchResult";
import { TradeStaticResponse } from "./static/Response";
import { TradeStatsResponse } from "./stats/Response";

/**
 * @endpoint https://pathofexile.com/api/trade/data/leagues
 * @param language: The language. Default: English
 *
 * @returns A list of currently active trade leagues.
 * @throws [[APIError]]
 */
export const getLeagues = async (language?: Language): Promise<TradeLeague[]> => {
  const url = handleKoreanURL("TradeLeagues", language);
  const response: TradeLeagueResponse = await requestTransformed(TradeLeagueResponse, url);
  return response.result;
};

/**
 * @endpoint https://pathofexile.com/api/trade/data/stats
 * @param language: The language. Default: English
 *
 * @throws [[APIError]]
 */
export const getStats = async (language?: Language): Promise<StatGroup[]> => {
  const url = handleKoreanURL("TradeStats", language);
  const response = await requestTransformed(TradeStatsResponse, url);
  return response.result;
};

/**
 * @endpoint https://pathofexile.com/api/trade/data/static
 * @param language: The language. Default: English
 *
 * @throws [[APIError]]
 */
export const getStatic = async (language?: Language): Promise<Group[]> => {
  const url = handleKoreanURL("TradeStatic", language);
  const response = await requestTransformed(TradeStaticResponse, url);
  return response.result;
};

/**
 *
 * @endpoint https://pathofexile.com/api/trade/data/items
 * @param language: The language. Default: English
 *
 * @returns A list of tradeable item bases including unique items.
 * @throws [[APIError]]
 */
export const getTradeItems = async (language?: Language): Promise<TradeItemGroup[]> => {
  const url = handleKoreanURL("TradeItems", language);
  const response = await requestTransformed(TradeItemsResponse, url);
  return response.result;
};

/**
 *
 * @endpoint https://pathofexile.com/api/trade/data/fetch/:hashes
 *
 * @param hashes The hashes of the items to fetch
 *
 * @returns A collection of listed items with the provided hashes
 * @throws [[APIError]]
 */
export const fetch = async (hashes: string[], query?: string): Promise<FetchResult[]> => {
  const url = buildURL(
    `${PublicEndpoints.TradeFetch}/${hashes.join(",")}`,
    query
      ? {
          query: query,
        }
      : {}
  );
  const response = await requestTransformed(TradeFetchResponse, url);
  return response.result;
};

/**
 * Execute a search query
 *
 * @endpoint https://www.pathofexile.com/api/trade/search/:league
 * @param league
 * @param query
 * @throws [[APIError]]
 */
export const search = async (
  league: string,
  query: SearchQueryContainer
): Promise<SearchResult> => {
  const url = new URL(`${PublicEndpoints.TradeSearch}/${league}`);
  const result = await requestTransformed(TradeSearchResult, url, "POST", query);
  return result;
};

/**
 * Execute an exchange query
 *
 * @endpoint https://www.pathofexile.com/api/trade/exchange/:league
 * @param league
 * @param query
 * @throws [[APIError]]
 */
export const exchange = async (
  league: string,
  query: ExchangeQueryContainer
): Promise<ExchangeResults> => {
  const url = new URL(`${PublicEndpoints.TradeExchange}/${league}`);
  const result = await requestTransformed(ExchangeResults, url, "POST", query);
  return result;
};

function handleKoreanURL(
  endpointKey: keyof typeof KoreanTradeEndpoints & keyof typeof PublicEndpoints,
  language?: Language
): URL {
  let endpoint: PublicEndpoints | KoreanTradeEndpoints = PublicEndpoints[endpointKey];

  if (language == Language.Korean) {
    endpoint = KoreanTradeEndpoints[endpointKey];
    language = undefined;
  }

  return buildURL(endpoint, undefined, undefined, undefined, language);
}
