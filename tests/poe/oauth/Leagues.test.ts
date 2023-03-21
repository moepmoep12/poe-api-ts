/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";
import { mochaGlobalSetup } from "../../mochaFixtures";

import { OAuthLeague } from "../../../src/poe/apis/oauth/leagues/League";
import { Leagues, ServiceScopes } from "../../../src/poe/apis/oauth";

import { APIError } from "../../../src/poe/errors";
import { ErrorMessage } from "../../../src/poe/errors/models/OAuthAPIError";

if (process.env.MOCHA_WORKER_ID) mochaGlobalSetup();

const hasScope = process.env.SCOPES?.includes(ServiceScopes.Leagues);
const leagueName = "Standard";

describe("Path of Exile - OAuthAPI - Leagues", function () {
  this.timeout(20000);

  if (!hasScope) {
    it("#getAll() - should reject unauthorized", async () => {
      await expect(Leagues.getAll()).to.be.rejectedWith(APIError, ErrorMessage.InsufficientScope);
    });

    it(`#getById(${leagueName}) - should reject unauthorized`, async () => {
      await expect(Leagues.getById(leagueName)).to.be.rejectedWith(
        APIError,
        ErrorMessage.InsufficientScope
      );
    });
    return;
  }

  describe(`getAll`, () => {
    this.timeout(5000);

    let leagues: OAuthLeague[];

    it("#getAll() - should return list of leagues", async () => {
      leagues = <OAuthLeague[]>await expect(Leagues.getAll()).to.be.fulfilled;
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

    let league: OAuthLeague;

    it(`#getById(${leagueName}) - should return data for a league`, async () => {
      league = <OAuthLeague>await expect(Leagues.getById(leagueName)).to.be.fulfilled;
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

    if (process.env.SCOPES?.includes(ServiceScopes.LeagueLadder)) {
      step("result.getLadder(true) - should return ladder", async () => {
        await expect(league.getLadder(true)).to.be.fulfilled;
      });
    }
  });
});
