import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { validateOrReject, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { PublicLadder } from "../../../../src/poe/apis/public/ladders/Ladder";

import ladderJson from "./resources/ladder.json";

describe("Path of Exile - Public - JSON - Ladders", function () {
  let ladder: PublicLadder;

  before(() => {
    ladder = plainToInstance(PublicLadder, ladderJson);
  });

  it("validateOrReject(ladder) - should be fulfilled", async () => {
    try {
      await validateOrReject(ladder, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });

  it("ladder.filterByCharacter() - should filter chars with class Ascendant", () => {
    const entries = ladder.filterByCharacter("class", "Ascendant");
    for (const entry of entries) {
      expect(entry.character.class).to.equal("Ascendant");
    }
  });

  it("ladder.filterBy() - should filter online characters", () => {
    const entries = ladder.filterBy("public", true);
    for (const entry of entries) {
      expect(entry.public).to.equal(true);
    }
  });
});
