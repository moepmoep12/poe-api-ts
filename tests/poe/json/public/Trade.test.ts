import "reflect-metadata";
import { describe, it } from "mocha";
import { validateOrReject, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { ExchangeResults } from "../../../../src/poe/shared/trade/query/exchange";

import { TradeLeagueResponse } from "../../../../src/poe/apis/public/trade/leagues/Response";
import { TradeStatsResponse } from "../../../../src/poe/apis/public/trade/stats/Response";
import { TradeStaticResponse } from "../../../../src/poe/apis/public/trade/static/Response";
import { TradeItemsResponse } from "../../../../src/poe/apis/public/trade/items/Response";
import { TradeFetchResponse } from "../../../../src/poe/apis/public/trade/fetch/Response";
import { TradeSearchResult } from "../../../../src/poe/apis/public/trade/search/SearchResult";

import tradeLeaguesJson from "./resources/tradeLeagues.json";
import tradeItemsJson from "./resources/tradeItems.json";
import tradeStatsJson from "./resources/tradeStats.json";
import tradeStaticJson from "./resources/tradeStatic.json";
import tradeFetchJson from "./resources/tradeFetch.json";
import tradeSearchJson from "./resources/tradeSearchResult.json";
import tradeExchangeJson from "./resources/tradeExchangeResult.json";

describe("Path of Exile - Public - JSON - Trade", function () {
  let tradeLeagueResponse: TradeLeagueResponse;
  let tradeStatsResponse: TradeStatsResponse;
  let tradeStaticResponse: TradeStaticResponse;
  let tradeItemsResponse: TradeItemsResponse;
  let tradeFetchResponse: TradeFetchResponse;
  let tradeSearchResult: TradeSearchResult;
  let tradeExchangeResults: ExchangeResults;

  before(() => {
    tradeLeagueResponse = plainToInstance(TradeLeagueResponse, tradeLeaguesJson);
    tradeStatsResponse = plainToInstance(TradeStatsResponse, tradeStatsJson);
    tradeStaticResponse = plainToInstance(TradeStaticResponse, tradeStaticJson);
    tradeItemsResponse = plainToInstance(TradeItemsResponse, tradeItemsJson);
    tradeFetchResponse = plainToInstance(TradeFetchResponse, tradeFetchJson);
    tradeSearchResult = plainToInstance(TradeSearchResult, tradeSearchJson);
    tradeExchangeResults = plainToInstance(ExchangeResults, tradeExchangeJson);
  });

  it("validateOrReject(tradeLeagueResponse) - should be fulfilled", async () => {
    try {
      await validateOrReject(tradeLeagueResponse, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });

  it("validateOrReject(tradeStatsResponse) - should be fulfilled", async () => {
    try {
      await validateOrReject(tradeStatsResponse, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });

  it("validateOrReject(tradeStaticResponse) - should be fulfilled", async () => {
    try {
      await validateOrReject(tradeStaticResponse, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });

  it("validateOrReject(tradeItemsResponse) - should be fulfilled", async () => {
    try {
      await validateOrReject(tradeItemsResponse, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });

  it("validateOrReject(tradeFetchResponse) - should be fulfilled", async () => {
    try {
      await validateOrReject(tradeFetchResponse, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });

  it("validateOrReject(tradeSearchResult) - should be fulfilled", async () => {
    try {
      await validateOrReject(tradeSearchResult, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });

  it("validateOrReject(tradeExchangeResults) - should be fulfilled", async () => {
    try {
      await validateOrReject(tradeExchangeResults, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });
});
