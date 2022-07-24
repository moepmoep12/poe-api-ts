/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { PlayerHistory, Season } from "../../../../src/poe/shared/seasons";

import { Seasons } from "../../../../src/poe/apis/public";

describe("Path of Exile - PublicAPI - Seasons", function () {
  this.timeout(10000);

  describe("get()", () => {
    this.timeout(5000);

    let result: Season[];

    it(`#get() - should return seasons list`, async () => {
      result = <Season[]>await expect(Seasons.get()).to.be.fulfilled;
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      for (const season of result) {
        try {
          await validateOrReject(season, validatorOptions);
        } catch (error: unknown) {
          throw new ValidationErrorExt(error as ValidationError[]);
        }
      }
    });
  });

  describe("getPlayerHistory()", () => {
    this.timeout(5000);

    const seasonId = "Medallion";
    const account = "Steelmage";
    let playerHistory: PlayerHistory;

    it(`#getPlayerHistory(${seasonId}, ${account}) - should return player history of account ${account} for season ${seasonId}`, async () => {
      playerHistory = <PlayerHistory>(
        await expect(Seasons.getPlayerHistory(seasonId, account)).to.be.fulfilled
      );
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      try {
        await validateOrReject(playerHistory, validatorOptions);
      } catch (error: unknown) {
        throw new ValidationErrorExt(error as ValidationError[]);
      }
    });

    step(`result.entries - should not be empty`, () => {
      expect(playerHistory.entries).to.be.not.empty;
    });
  });
});
