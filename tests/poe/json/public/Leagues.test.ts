import "reflect-metadata";
import { describe, it } from "mocha";
import { validateOrReject, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { LeagueRule } from "../../../../src/poe/shared/leagues";

import { PublicLeague } from "../../../../src/poe/apis/public/leagues/League";

import leaguesJson from "./resources/leagues.json";
import leagueRulesJson from "./resources/leagueRules.json";
import leagueWithLadderJson from "./resources/leagueWithLadder.json";

describe("Path of Exile - Public - JSON - Leagues", function () {
  let leagues: PublicLeague[];
  let leagueWithLadder: PublicLeague;
  let leagueRules: LeagueRule[];

  before(() => {
    leagues = plainToInstance(PublicLeague, leaguesJson);
    leagueWithLadder = plainToInstance(PublicLeague, leagueWithLadderJson);
    leagueRules = plainToInstance(LeagueRule, leagueRulesJson);
  });

  it("validateOrReject(leagues) - should be fulfilled", async () => {
    for (const league of leagues) {
      try {
        await validateOrReject(league, validatorOptions);
      } catch (error: unknown) {
        throw new ValidationErrorExt(error as ValidationError[]);
      }
    }
  });

  it("validateOrReject(leagueWithLadder) - should be fulfilled", async () => {
    try {
      await validateOrReject(leagueWithLadder, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });

  it("validateOrReject(leagueRules) - should be fulfilled", async () => {
    for (const rule of leagueRules) {
      try {
        await validateOrReject(rule, validatorOptions);
      } catch (error: unknown) {
        throw new ValidationErrorExt(error as ValidationError[]);
      }
    }
  });
});
