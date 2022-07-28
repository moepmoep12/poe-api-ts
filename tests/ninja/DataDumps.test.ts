/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../ValidationError";
import { validatorOptions } from "../ValidatorOptions";
import { mochaGlobalSetup } from "../mochaFixtures";

import { DataDumps } from "../../src/ninja/apis/";
import { DataDump } from "../../src/ninja/apis/dumps";

if (process.env.MOCHA_WORKER_ID) mochaGlobalSetup();

describe("PoE.Ninja - Data Dumps", function () {
  this.timeout(10000);

  describe(`get()`, () => {
    this.timeout(4000);

    let result: DataDump[];

    it(`#get() - should return data dumps`, async () => {
      result = <DataDump[]>await expect(DataDumps.get()).to.be.fulfilled;
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      for (const dump of result) {
        try {
          await validateOrReject(dump, validatorOptions);
        } catch (error: unknown) {
          if (Array.isArray(error) && error[0] instanceof ValidationError)
            throw new ValidationErrorExt(error as ValidationError[]);
          else throw error;
        }
      }
    });
  });
});
