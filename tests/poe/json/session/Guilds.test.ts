import "reflect-metadata";
import { describe, it } from "mocha";
import { validateOrReject, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { Guild } from "../../../../src/poe/shared/guilds";

import { SessionStashHistory } from "../../../../src/poe/apis/session/guild/StashHistory";
import { SessionPointTransactions } from "../../../../src/poe/apis/session/guild/PointTransactions";

import stashHistoryJson from "./resources/guildStashHistory.json";
import guildJson from "./resources/guild.json";
import transactionHistoryJson from "./resources/guildPointTransactions.json";

describe("Path of Exile - SessionAPI - JSON - Guilds", function () {
  let stashHistory: SessionStashHistory;
  let guild: Guild;
  let transactionHistory: SessionPointTransactions;

  before(() => {
    stashHistory = plainToInstance(SessionStashHistory, stashHistoryJson);
    guild = plainToInstance(Guild, guildJson);
    transactionHistory = plainToInstance(SessionPointTransactions, transactionHistoryJson);
  });

  it("validateOrReject(history) - should be fulfilled", async () => {
    try {
      await validateOrReject(stashHistory, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });

  it("validateOrReject(guild) - should be fulfilled", async () => {
    try {
      await validateOrReject(guild, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });

  it("validateOrReject(transactionHistory) - should be fulfilled", async () => {
    try {
      await validateOrReject(transactionHistory, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });
});
