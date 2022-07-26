/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";
import { mochaGlobalSetup } from "../../mochaFixtures";

import { LadderCharacter } from "../../../src/poe/shared/ladders";

import { Ladders } from "../../../src/poe/apis/public";
import { PublicLadder } from "../../../src/poe/apis/public/ladders/Ladder";
import { PublicLadderOptions } from "../../../src/poe/apis/public/ladders";

if (process.env.MOCHA_WORKER_ID) mochaGlobalSetup();

describe("Path of Exile - PublicAPI - Ladders", function () {
  this.timeout(10000);

  const league = "Standard";
  const limit = 40;
  const filterKey: keyof LadderCharacter = "class";
  const filterValue = "Ascendant";
  const options: PublicLadderOptions = {
    limit: limit,
  };
  let ladder: PublicLadder;

  it(`#get(${league}, { limit: ${limit}}) - should return ladder for ${league} league`, async () => {
    ladder = <PublicLadder>await expect(Ladders.get(league, options)).to.be.fulfilled;
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
      const entries = ladder.filterByCharacter("class", "Ascendant");
      for (const entry of entries) {
        expect(entry.character.class).to.equal("Ascendant");
      }
    }
  );

  step("result.filterBy('public')) - should filter online characters", () => {
    const entries = ladder.filterBy("public", true);
    for (const entry of entries) {
      expect(entry.public).to.equal(true);
    }
  });

  step(`result.toPlain() - should contain cached_since`, () => {
    expect("cached_since" in ladder.toPlain()).to.be.true;
  });

  step("ladder.getNextEntries() - should fetch next entries", async () => {
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
