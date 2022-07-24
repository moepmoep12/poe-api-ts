import "reflect-metadata";
import { describe, it } from "mocha";
import { validateOrReject, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { PlayerHistory, Season } from "../../../../src/poe/shared/seasons";

import seasonsJson from "./resources/seasons.json";
import playerHistoryJson from "./resources/seasonPlayerHistory.json";

describe("Path of Exile - Public - JSON - Seasons", function () {
  let seasons: Season[];
  let playerHistory: PlayerHistory;

  before(() => {
    seasons = plainToInstance(Season, seasonsJson);
    playerHistory = plainToInstance(PlayerHistory, playerHistoryJson);
  });

  it("validateOrReject(seasons) - should be fulfilled", async () => {
    for (const season of seasons) {
      try {
        await validateOrReject(season, validatorOptions);
      } catch (error: unknown) {
        throw new ValidationErrorExt(error as ValidationError[]);
      }
    }
  });

  it("validateOrReject(playerHistory) - should be fulfilled", async () => {
    try {
      await validateOrReject(playerHistory, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });
});
