// import "reflect-metadata";
// import { describe, it } from "mocha";
// import { expect } from "chai";
// import { step } from "mocha-steps";
// import { validateOrReject, ValidationError } from "class-validator";

// import { ValidationErrorExt } from "../../ValidationError";
// import { validatorOptions } from "../../ValidatorOptions";
// import { mochaGlobalSetup } from "../../mochaFixtures";

// import { Items } from "../../../src/ninja/apis/";
// import { SentinelOverview } from "../../../src/ninja/apis/items/sentinels";

// if (process.env.MOCHA_WORKER_ID) mochaGlobalSetup();

// describe(`PoE.Ninja - Items - Sentinels`, function () {
//   this.timeout(5000);

//   const league = "Standard";
//   let result: SentinelOverview;

//   it(`#getOverview(${league}) - should return ItemOverview`, async () => {
//     result = <SentinelOverview>await expect(Items.Sentinels.getOverview(league)).to.be.fulfilled;
//   });

//   // eslint-disable-next-line @typescript-eslint/no-misused-promises
//   step("validateOrReject(result) - should be fulfilled", async () => {
//     try {
//       await validateOrReject(result, validatorOptions);
//     } catch (error: unknown) {
//       if (Array.isArray(error) && error[0] instanceof ValidationError)
//         throw new ValidationErrorExt(error as ValidationError[]);
//       else throw error;
//     }
//   });
// });
