/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";
import { mochaGlobalSetup } from "../../mochaFixtures";

import { PVPMatches, ServiceScopes } from "../../../src/poe/apis/oauth";

import { APIError } from "../../../src/poe/errors";
import { ErrorMessage } from "../../../src/poe/errors/models/OAuthAPIError";
import { OAuthPvpMatch } from "../../../src/poe/apis/oauth/pvpmatches/PvpMatch";
import { OAuthPvpLadder } from "../../../src/poe/apis/oauth/pvpmatches/PvpLadder";

if (process.env.MOCHA_WORKER_ID) mochaGlobalSetup();

const leagueName = "Standard";

describe("Path of Exile - OAuthAPI - PVPMatches", function () {
  this.timeout(30000);

  let pvpMatches: OAuthPvpMatch[];

  this.timeout(20000);

  const hasScope = process.env.SCOPES?.includes(ServiceScopes.PvpMatches);
  if (!hasScope) {
    it("#getMatches() - should reject unauthorized", async () => {
      await expect(PVPMatches.getMatches()).to.be.rejectedWith(
        APIError,
        ErrorMessage.InsufficientScope
      );
    });

    it(`#getMatch('')) - should reject unauthorized`, async () => {
      await expect(PVPMatches.getMatch("")).to.be.rejectedWith(
        APIError,
        ErrorMessage.InsufficientScope
      );
    });
    return;
  }

  it("#getMatches() - should return PvP matches", async () => {
    pvpMatches = <OAuthPvpMatch[]>(
      await expect(PVPMatches.getMatches({ league: leagueName, type: "league" })).to.be.fulfilled
    );
  });

  step("validateOrReject(result) - should be fulfilled", async () => {
    for (const pvpMatch of pvpMatches) {
      try {
        await validateOrReject(pvpMatch, validatorOptions);
      } catch (error: unknown) {
        if (Array.isArray(error) && error[0] instanceof ValidationError)
          throw new ValidationErrorExt(error as ValidationError[]);
        else throw error;
      }
    }
  });

  step(`result - should not be empty`, () => {
    expect(pvpMatches).to.be.not.empty;
  });

  step("#getMatch() - should return single match", async () => {
    await expect(PVPMatches.getMatch(pvpMatches[0].id)).to.be.fulfilled;
  });

  let pvpLadder: OAuthPvpLadder;

  if (!process.env.SCOPES?.includes(ServiceScopes.PvpLadder)) {
    it("#getLadder() - should reject unauthorized", async () => {
      await expect(PVPMatches.getLadder(pvpMatches[0].id)).to.be.rejectedWith(
        APIError,
        ErrorMessage.InsufficientScope
      );
    });
    return;
  }

  step("#getLadder - should return PvP Ladder", async () => {
    pvpLadder = <OAuthPvpLadder>(
      await expect(PVPMatches.getLadder(pvpMatches[0].id)).to.be.fulfilled
    );
  });

  step("validateOrReject(result) - should be fulfilled", async () => {
    try {
      await validateOrReject(pvpLadder, validatorOptions);
    } catch (error: unknown) {
      if (Array.isArray(error) && error[0] instanceof ValidationError)
        throw new ValidationErrorExt(error as ValidationError[]);
      else throw error;
    }
  });
});
