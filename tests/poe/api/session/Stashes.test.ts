/* eslint-disable @typescript-eslint/no-misused-promises */

// DEPRECATED - TODO: REMOVE

// import "reflect-metadata";
// import Color from "color";
// import { describe, it } from "mocha";
// import { expect, assert } from "chai";
// import { step } from "mocha-steps";
// import { plainToInstance } from "class-transformer";
// import { validateOrReject, ValidationError } from "class-validator";

// import { ValidationErrorExt } from "../../../ValidationError";

// import { Accounts, Stashes } from "../..//../../src/poe/apis/session";

// import { Stash, StashTabBase } from "../..//../../src/poe/shared/stashes";

// import { APIError, ErrorMessage } from "../..//../../src/poe/errors";

// import stashesJson from "./resources/stash.json";
// import { SessionStash } from "../..//../../src/poe/apis/session/stashes";

// const league = "Standard";

// describe("Path of Exile - SessionAPI - Stashes", function () {
//   this.timeout(20000);

//   if (!process.env.POESESSID) {
//     it("#getStash() - should reject forbidden", async () => {
//       await expect(Stashes.getStash("moepmoep12", league)).to.be.rejectedWith(
//         APIError,
//         ErrorMessage.Forbidden
//       );
//     });
//     return;
//   }

//   let stash: Stash<StashTabBase>;
//   let accountName = "";

//   before(async () => {
//     const account = await Accounts.getProfile();
//     accountName = account.name;
//   });

//   it(`#getStash(${accountName}, ${league}) - should return stash`, async () => {
//     stash = <Stash<StashTabBase>>(
//       await expect(Stashes.getStash(accountName, league)).to.be.fulfilled
//     );
//   });

//   step("stash - should not be empty", () => {
//     expect(stash.tabs).to.be.not.empty;
//   });

//   step("stashTab.update() - should update stash tab", async () => {
//     await expect(stash.tabs[0].update()).to.be.fulfilled;
//   });

//   step("stashTab.Color - should get stash tab color", () => {
//     expect(stash.tabs[0].Color).to.be.instanceOf(Color);
//   });
// });

// describe("Path of Exile - Session - JSON - Stashes", function () {
//   let stash: Stash<StashTabBase>;

//   before(() => {
//     stash = plainToInstance(SessionStash, stashesJson);
//   });

//   it("stash - should correctly load stash", () => {
//     assert(stash, "Failed loading stash");
//     assert(stash.tabs && stash.tabs[0], "Failed loading stash tabs");
//   });

//   it("stashTab.Color - should be correct RGB color", () => {
//     expect(stash.tabs[0].Color.rgb().array()).to.be.eql([124, 84, 54]);
//   });
// });
