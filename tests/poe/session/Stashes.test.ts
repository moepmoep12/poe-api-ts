/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import Color from "color";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";
import { mochaGlobalSetup } from "../../mochaFixtures";

import { APIError, ErrorMessage } from "../../../src/poe/errors";

import { Accounts, Stashes } from "../../../src/poe/apis/session";

import { SessionStash } from "../../../src/poe/apis/session/stashes/Stash";
import { SessionStashTab } from "../../../src/poe/apis/session/stashes/StashTab";

if (process.env.MOCHA_WORKER_ID) mochaGlobalSetup();

describe("Path of Exile - SessionAPI - Stashes", function () {
  this.timeout(20000);

  const league = "Standard";

  if (!process.env.POESESSID) {
    it("#getStash() - should reject forbidden", async () => {
      await expect(Stashes.getStash("moepmoep12", league)).to.be.rejectedWith(
        APIError,
        ErrorMessage.Forbidden
      );
    });
    return;
  }

  let stash: SessionStash;
  let stashTab: SessionStashTab;
  let accountName = "";

  before(async () => {
    const account = await Accounts.getProfile();
    accountName = account.name;
  });

  describe(`getStash()`, () => {
    this.timeout(20000);

    it(`#getStash(${accountName}, ${league}) - should return stash`, async () => {
      stash = <SessionStash>await expect(Stashes.getStash(accountName, league)).to.be.fulfilled;
      stashTab = stash.tabs[0];
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      try {
        await validateOrReject(stash, validatorOptions);
      } catch (error: unknown) {
        if (Array.isArray(error) && error.every((val) => val instanceof ValidationError))
          throw new ValidationErrorExt(error as ValidationError[]);
        else throw error;
      }
    });

    step("stashTab.update() - should update stash tab", async () => {
      await expect(stashTab.update()).to.be.fulfilled;
    });

    step("stashTab.Color - should get stash tab color", () => {
      expect(stashTab.Color).to.be.instanceOf(Color);
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      try {
        await validateOrReject(stashTab, validatorOptions);
      } catch (error: unknown) {
        if (Array.isArray(error) && error[0] instanceof ValidationError)
          throw new ValidationErrorExt(error as ValidationError[]);
        else throw error;
      }
    });
  });
});
