/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { step } from "mocha-steps";
import { expect } from "chai";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { IgnoredAccounts } from "../../../../src/poe/shared/trade/ignore";
import { Trade } from "../../../../src/poe/apis/session";

describe("Path of Exile - PublicAPI - Trade", function () {
  this.timeout(5000);

  describe(`getIgnoredAccounts()`, () => {
    this.timeout(5000);

    let ignoredAccounts: IgnoredAccounts;

    it(`#getIgnoredAccounts() - should return list of ignored accounts`, async () => {
      ignoredAccounts = <IgnoredAccounts>await expect(Trade.getIgnoredAccounts()).to.be.fulfilled;
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      try {
        await validateOrReject(ignoredAccounts, validatorOptions);
      } catch (error: unknown) {
        throw new ValidationErrorExt(error as ValidationError[]);
      }
    });
  });
});
