/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { step } from "mocha-steps";
import { expect } from "chai";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../ValidationError";
import { validatorOptions } from "../ValidatorOptions";
import { mochaGlobalSetup } from "../mochaFixtures";

import { Currencies } from "../../src/ninja/apis/";
import { CurrencyOverview, CurrencyOption, History } from "../../src/ninja/apis/currency";

if (process.env.MOCHA_WORKER_ID) mochaGlobalSetup();

describe("PoE.Ninja - Currency", function () {
  this.timeout(10000);

  const league = "Standard";
  const types = Object.values(CurrencyOption);

  describe(`getOverview()`, () => {
    this.timeout(5000);

    let result: CurrencyOverview;

    for (const ctype of types) {
      it(`#getOverview(${league}, ${ctype}) - should return CurrencyOverview`, async () => {
        result = <CurrencyOverview>(
          await expect(Currencies.getOverview(league, ctype)).to.be.fulfilled
        );
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
    }
  });

  describe(`getHistory()`, () => {
    this.timeout(5000);

    let result: History;

    it(`#getHistory(${league}, ${CurrencyOption.Currency}, 2) - should return history`, async () => {
      result = <History>(
        await expect(Currencies.getHistory(league, CurrencyOption.Currency, 2)).to.be.fulfilled
      );
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
