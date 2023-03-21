/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";
import { mochaGlobalSetup } from "../../mochaFixtures";

import { Leagues } from "../../../src/poe/apis/public";

import { PublicLeague } from "../../../src/poe/apis/public/leagues/League";

if (process.env.MOCHA_WORKER_ID) mochaGlobalSetup();

describe("Path of Exile - PublicAPI - Leagues", function () {
  this.timeout(20000);

  const leagueName = "Standard";

  describe(`getAll`, () => {
    this.timeout(5000);

    let leagues: PublicLeague[];

    it("#getAll() - should return list of leagues", async () => {
      leagues = <PublicLeague[]>await expect(Leagues.getAll()).to.be.fulfilled;
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      for (const league of leagues) {
        try {
          await validateOrReject(league, validatorOptions);
        } catch (error: unknown) {
          if (Array.isArray(error) && error[0] instanceof ValidationError)
            throw new ValidationErrorExt(error as ValidationError[]);
          else throw error;
        }
      }
    });
  });

  describe(`getById()`, () => {
    this.timeout(5000);

    let league: PublicLeague;

    it(`#getById(${leagueName}) - should return data for a league`, async () => {
      league = <PublicLeague>await expect(Leagues.getById(leagueName)).to.be.fulfilled;
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      try {
        await validateOrReject(league, validatorOptions);
      } catch (error: unknown) {
        if (Array.isArray(error) && error[0] instanceof ValidationError)
          throw new ValidationErrorExt(error as ValidationError[]);
        else throw error;
      }
    });

    step("result.getLadder(true) - should return ladder", async () => {
      await expect(league.getLadder(true)).to.be.fulfilled;
    });
  });
});
