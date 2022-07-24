/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../ValidationError";
import { validatorOptions } from "../ValidatorOptions";

import { Stats } from "../../src/ninja/apis/";

import { Statistics } from "../../src/ninja/apis/stats/Statistics";

describe("PoE.Ninja - Stats", function () {
  this.timeout(10000);

  describe(`get()`, () => {
    this.timeout(4000);

    let result: Statistics;

    it(`#get() - should return statistics`, async () => {
      result = <Statistics>await expect(Stats.get()).to.be.fulfilled;
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
