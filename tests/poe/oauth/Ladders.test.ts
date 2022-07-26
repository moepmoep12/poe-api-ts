/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";
import { mochaGlobalSetup } from "../../mochaFixtures";

import { Ladders, ServiceScopes } from "../../../src/poe/apis/oauth";
import { OAuthLadder } from "../../../src/poe/apis/oauth/ladders/Ladder";
import { OAuthLadderOptions } from "../../../src/poe/apis/oauth/ladders";

import { LadderCharacter } from "../../../src/poe/shared/ladders";

import { APIError } from "../../../src/poe/errors";
import { ErrorMessage } from "../../../src/poe/errors/models/OAuthAPIError";

if (process.env.MOCHA_WORKER_ID) mochaGlobalSetup();

const hasScope = process.env.SCOPES?.includes(ServiceScopes.LeagueLadder);

describe("Path of Exile - OAuthAPI - Ladders", function () {
  this.timeout(20000);

  const league = "Standard";
  const limit = 40;
  const filterKey: keyof LadderCharacter = "class";
  const filterValue = "Ascendant";
  const options: OAuthLadderOptions = {
    limit: limit,
  };
  let ladder: OAuthLadder;

  if (!hasScope) {
    it(`#get(${league}) - should reject insufficient scope`, async () => {
      await expect(Ladders.get(league)).to.be.rejectedWith(
        APIError,
        ErrorMessage.InsufficientScope
      );
    });
    return;
  }

  it(`#get(${league}, { limit: ${limit}}) - should return ladder for ${league} league`, async () => {
    ladder = <OAuthLadder>await expect(Ladders.get(league, options)).to.be.fulfilled;
  });

  step("validateOrReject(result) - should be fulfilled", async () => {
    try {
      await validateOrReject(ladder, validatorOptions);
    } catch (error: unknown) {
      if (Array.isArray(error) && error[0] instanceof ValidationError)
        throw new ValidationErrorExt(error as ValidationError[]);
      else throw error;
    }
  });

  step(`result.entries.length - should be ${limit}`, () => {
    expect(ladder.entries.length).to.be.equal(limit);
  });

  step(
    `result.filterByCharacter('${filterKey}', '${filterValue}') - should filter chars with ${filterKey} ${filterValue}`,
    () => {
      const entries = ladder.filterByCharacter(filterKey, filterValue);
      for (const entry of entries) {
        expect(entry.character.class).to.equal(filterValue);
      }
    }
  );

  step("result.filterBy('public')) - should filter online characters", () => {
    const entries = ladder.filterBy("public", true);
    for (const entry of entries) {
      expect(entry.public).to.equal(true);
    }
  });

  step("result.getNextEntries(true) - should return next entries", async () => {
    await expect(ladder.getNextEntries(true)).to.be.fulfilled;
  });

  step(`ladder.entries.length - should be ${2 * limit}`, () => {
    expect(ladder.entries.length).to.be.equal(2 * limit);
  });

  step("result.getNextEntries(true) - should return null with no options", async () => {
    // @ts-expect-error testing
    const origOptions = { ...ladder.ladderOptions };
    const invalidOptions = {
      offset: -1,
    };
    ladder.options = invalidOptions;
    const result = <null>await expect(ladder.getNextEntries(true)).to.be.fulfilled;
    ladder.options = origOptions;
    expect(result).to.be.null;
  });

  step("result.getNextEntries(true) - should return null with exceeding offset", async () => {
    // @ts-expect-error testing
    const origOptions = { ...ladder.ladderOptions };
    const invalidOptions = {
      offset: 9999999,
    };
    ladder.options = invalidOptions;
    const result = <null>await expect(ladder.getNextEntries(true)).to.be.fulfilled;
    ladder.options = origOptions;
    expect(result).to.be.null;
  });
});
