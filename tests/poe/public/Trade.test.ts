/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { step } from "mocha-steps";
import { expect } from "chai";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";
import { mochaGlobalSetup } from "../../mochaFixtures";

import { Group } from "../../../src/poe/shared/trade/static";
import { StatGroup } from "../../../src/poe/shared/trade/stats";

import { Trade } from "../../../src/poe/apis/public";
import { TradeItemGroup } from "../../../src/poe/shared/trade/items";
import { PublicTradeLeague } from "../../../src/poe/apis/public/trade/leagues/TradeLeague";
import { TradeSearchResult } from "../../../src/poe/apis/public/trade/search/SearchResult";
import { SearchQueryContainer } from "../../../src/poe/shared/trade/query/search";
import {
  ExchangeQueryContainer,
  ExchangeResults,
} from "../../../src/poe/shared/trade/query/exchange";
import { FetchResult } from "../../../src/poe/shared/trade/query/fetch";
import { StatFilterType } from "../../../src/poe/shared/trade/query/Query";

if (process.env.MOCHA_WORKER_ID) mochaGlobalSetup();

describe("Path of Exile - PublicAPI - Trade", function () {
  this.timeout(50000);

  describe(`getStatic()`, () => {
    this.timeout(10000);

    let groups: Group[];

    it(`#getStatic() - should return list of trade static items`, async () => {
      groups = <Group[]>await expect(Trade.getStatic()).to.be.fulfilled;
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      for (const group of groups) {
        try {
          await validateOrReject(group, validatorOptions);
        } catch (error: unknown) {
          if (Array.isArray(error) && error[0] instanceof ValidationError)
            throw new ValidationErrorExt(error as ValidationError[]);
          else throw error;
        }
      }
    });
  });

  describe(`fetch()`, () => {
    this.timeout(10000);

    const hashes = ["977cf61567e9341a4a88d6d6ef9e5eebc4620d16d26174b5d07205c7514772cb"];
    let results: FetchResult[];

    it(`#fetch() - should return listed items with provided hash values`, async () => {
      results = <FetchResult[]>await expect(Trade.fetch(hashes)).to.be.fulfilled;
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      for (const result of results) {
        try {
          await validateOrReject(result, validatorOptions);
        } catch (error: unknown) {
          if (Array.isArray(error) && error[0] instanceof ValidationError)
            throw new ValidationErrorExt(error as ValidationError[]);
          else throw error;
        }
      }
    });
  });

  describe(`getStats()`, () => {
    this.timeout(10000);

    let statGroups: StatGroup[];

    it(`#getStats() - should return list of trade stats`, async () => {
      statGroups = <StatGroup[]>await expect(Trade.getStats()).to.be.fulfilled;
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      for (const group of statGroups) {
        try {
          await validateOrReject(group, validatorOptions);
        } catch (error: unknown) {
          if (Array.isArray(error) && error[0] instanceof ValidationError)
            throw new ValidationErrorExt(error as ValidationError[]);
          else throw error;
        }
      }
    });
  });

  describe(`getLeagues()`, () => {
    this.timeout(10000);

    let tradeLeagues: PublicTradeLeague[];

    it("#getLeagues() - should return list of trade leagues", async () => {
      tradeLeagues = <PublicTradeLeague[]>await expect(Trade.getLeagues()).to.be.fulfilled;
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      for (const tradeLeague of tradeLeagues) {
        try {
          await validateOrReject(tradeLeague, validatorOptions);
        } catch (error: unknown) {
          if (Array.isArray(error) && error[0] instanceof ValidationError)
            throw new ValidationErrorExt(error as ValidationError[]);
          else throw error;
        }
      }
    });

    step(`result[0].getLeague() - should return League`, async () => {
      await expect(tradeLeagues[0].getLeague()).to.be.fulfilled;
    });
  });

  describe(`getTradeItems()`, () => {
    this.timeout(10000);

    let tradeItemGroups: TradeItemGroup[];

    it("#getTradeItems() - should return list of trade items", async () => {
      tradeItemGroups = <TradeItemGroup[]>await expect(Trade.getTradeItems()).to.be.fulfilled;
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      for (const tradeItemGroup of tradeItemGroups) {
        try {
          await validateOrReject(tradeItemGroup, validatorOptions);
        } catch (error: unknown) {
          if (Array.isArray(error) && error[0] instanceof ValidationError)
            throw new ValidationErrorExt(error as ValidationError[]);
          else throw error;
        }
      }
    });
  });

  describe(`search(league, query)`, () => {
    this.timeout(10000);
    const league = "Standard";
    const nextCount = 10;
    let result: TradeSearchResult;

    it(`#search(${league}, query) - should return search results`, async () => {
      const query: SearchQueryContainer = {
        query: { status: { option: "online" }, stats: [{ type: StatFilterType.And, filters: [] }] },
        sort: { price: "asc" },
      };

      result = <TradeSearchResult>await expect(Trade.search(league, query)).to.be.fulfilled;
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      try {
        await validateOrReject(result, validatorOptions);
      } catch (error: unknown) {
        if (Array.isArray(error) && error[0] instanceof ValidationError)
          throw new ValidationErrorExt(error as ValidationError[]);
        else throw error;
      }
    });

    step(`result.getNextItems(${nextCount}) - should return next listed items`, async () => {
      await expect(result.getNextItems(nextCount)).to.be.fulfilled;
    });
  });

  describe(`exchange(league, query)`, () => {
    this.timeout(10000);
    const league = "Standard";
    let result: ExchangeResults;

    it(`#exchange(${league}, query) - should return exchange results`, async () => {
      const query: ExchangeQueryContainer = {
        query: {
          status: { option: "online" },
          have: ["mirror", "prime-regrading-lens"],
          want: ["exalted"],
        },
        engine: "new",
      };

      result = <ExchangeResults>await expect(Trade.exchange(league, query)).to.be.fulfilled;
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      try {
        await validateOrReject(result, validatorOptions);
      } catch (error: unknown) {
        if (Array.isArray(error) && error[0] instanceof ValidationError)
          throw new ValidationErrorExt(error as ValidationError[]);
        else throw error;
      }
    });
  });
});
