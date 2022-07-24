/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { Guilds } from "../..//../../src/poe/apis/session";
import { SessionStashHistory } from "../../../../src/poe/apis/session/guild/StashHistory";
import { SessionGuild } from "../../../../src/poe/apis/session/guild/Guild";
import { SessionPointTransactions } from "../../../../src/poe/apis/session/guild/PointTransactions";

import { APIError, ErrorMessage } from "../..//../../src/poe/errors";

describe("Path of Exile - SessionAPI - Guilds", function () {
  this.timeout(20000);

  if (!process.env.POESESSID) {
    it("#get() - should reject Unauthorized", async () => {
      await expect(Guilds.get()).to.be.rejectedWith(APIError, ErrorMessage.Unauthorized);
    });

    it("#getStashHistory('') - sshould reject Unauthorized", async () => {
      await expect(Guilds.getStashHistory("")).to.be.rejectedWith(
        APIError,
        ErrorMessage.Unauthorized
      );
    });

    it("#getPointTransactions() - should reject Unauthorized", async () => {
      await expect(Guilds.getPointTransactions()).to.be.rejectedWith(
        APIError,
        ErrorMessage.Unauthorized
      );
    });

    it("#getAccountPointTransactions() - should reject forbidden", async () => {
      await expect(Guilds.getAccountPointTransactions()).to.be.rejectedWith(
        APIError,
        ErrorMessage.Unauthorized
      );
    });
    return;
  }

  let guild: SessionGuild;

  describe(`get()`, () => {
    this.timeout(5000);

    it("#get() - should return guild", async () => {
      guild = <SessionGuild>await expect(Guilds.get()).to.be.fulfilled;
    });

    step(`validateOrReject(guild) - should be fulfilled`, async () => {
      try {
        await validateOrReject(guild, validatorOptions);
      } catch (error: unknown) {
        throw new ValidationErrorExt(error as ValidationError[]);
      }
    });
  });

  describe(`getStashHistory()`, () => {
    this.timeout(5000);
    let stashHistory: SessionStashHistory;

    step("#getStashHistory(id) - should return the guild stash history", async () => {
      if (guild) await expect(Guilds.getStashHistory(guild.id)).to.be.fulfilled;
      else
        stashHistory = <SessionStashHistory>await expect(Guilds.getStashHistory("")).to.be.rejected;
    });

    step(`validateOrReject(result) - should be fulfilled`, async () => {
      if (!stashHistory) return;

      try {
        await validateOrReject(stashHistory, validatorOptions);
      } catch (error: unknown) {
        throw new ValidationErrorExt(error as ValidationError[]);
      }
    });
  });

  describe(`getPointTransactions()`, () => {
    this.timeout(5000);
    let pointTransactions: SessionPointTransactions;

    step(
      "#getPointTransactions() - should return the point transaction history of all guild members",
      async () => {
        if (guild) await expect(Guilds.getPointTransactions()).to.be.fulfilled;
        else
          pointTransactions = <SessionPointTransactions>(
            await expect(Guilds.getPointTransactions()).to.be.rejected
          );
      }
    );

    step(`validateOrReject(result) - should be fulfilled`, async () => {
      if (!pointTransactions) return;

      try {
        await validateOrReject(pointTransactions, validatorOptions);
      } catch (error: unknown) {
        throw new ValidationErrorExt(error as ValidationError[]);
      }
    });
  });

  describe(`getAccountPointTransactions()`, () => {
    this.timeout(5000);
    let accountPointTransactions: SessionPointTransactions;

    step(
      "#getAccountPointTransactions() - should return the point transaction history of the owning account",
      async () => {
        if (guild) await expect(Guilds.getAccountPointTransactions()).to.be.fulfilled;
        else
          accountPointTransactions = <SessionPointTransactions>(
            await expect(Guilds.getAccountPointTransactions()).to.be.rejected
          );
      }
    );

    step(`validateOrReject(result) - should be fulfilled`, async () => {
      if (!accountPointTransactions) return;

      try {
        await validateOrReject(accountPointTransactions, validatorOptions);
      } catch (error: unknown) {
        throw new ValidationErrorExt(error as ValidationError[]);
      }
    });
  });
});
