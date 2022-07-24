/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import Color from "color";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { OAuthStashTab } from "../../../../src/poe/apis/oauth/stashes/StashTab";
import { OAuthStash } from "../../../../src/poe/apis/oauth/stashes/Stash";
import { AccountScopes, Stashes } from "../../../../src/poe/apis/oauth";

import { APIError } from "../../../../src/poe/errors";
import { ErrorMessage } from "../../../../src/poe/errors/models/OAuthAPIError";

const scopes = <string>process.env.SCOPES;

describe("Path of Exile - OAuthAPI - Stashes", function () {
  this.timeout(40000);

  const league = "Standard";

  if (!scopes?.includes(AccountScopes.Stashes)) {
    it("#getStash() - should reject unauthorized", async () => {
      await expect(Stashes.getStash(league)).to.be.rejectedWith(
        APIError,
        ErrorMessage.InsufficientScope
      );
    });
    return;
  }

  let stash: OAuthStash;

  describe(`getStash()`, () => {
    this.timeout(20000);

    it(`#getStash(${league}) - should return stash`, async () => {
      stash = <OAuthStash>await expect(Stashes.getStash(league)).to.be.fulfilled;
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
  });

  describe(`getStashTab()`, () => {
    this.timeout(10000);

    let stashTab: OAuthStashTab;

    if (!stash) return;

    step(`#getStashTab(${league}, stash.tabs[0].id) - should return stash tab`, async () => {
      stashTab = <OAuthStashTab>(
        await expect(Stashes.getStashTab(league, stash.tabs[0].id)).to.be.fulfilled
      );
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

    step("stashTab.update() - should update stash tab", async () => {
      await expect(stashTab.update()).to.be.fulfilled;
    });

    step("stashTab.Color - should get stash tab color", () => {
      expect(stashTab.Color).to.be.instanceOf(Color);
    });
  });
});

// describe("Path of Exile - OAuth - JSON - Stashes", function () {
//   let stash: Stash<StashTabBase>;

//   before(() => {
//     const tabs = plainToInstance(OAuthStashTab, stashesJson.stashes);
//     stash = {
//       numTabs: tabs.length,
//       tabs: tabs,
//       toPlain: function (): unknown {
//         return instanceToPlain(this);
//       },
//     };
//   });

//   it("stash - should correctly load stash", () => {
//     assert(stash, "Failed loading stash");
//     assert(stash.tabs && stash.tabs[0], "Failed loading stash tabs");
//   });

//   it("stashTab.Color - should be correct RGB color", () => {
//     expect(stash.tabs[0].Color.rgb().array()).to.be.eql([124, 84, 54]);
//   });
// });
