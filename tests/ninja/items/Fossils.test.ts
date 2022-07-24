import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";

import { Items } from "../../../src/ninja/apis/";
import { FossilOverview } from "../../../src/ninja/apis/items/fossils";

describe(`PoE.Ninja - Items - Fossils`, function () {
  this.timeout(5000);

  const league = "Standard";
  let result: FossilOverview;

  it(`#getOverview(${league}) - should return ItemOverview`, async () => {
    result = <FossilOverview>await expect(Items.Fossils.getOverview(league)).to.be.fulfilled;
  });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  step("validateOrReject(result) - should be fulfilled", async () => {
    try {
      await validateOrReject(result, validatorOptions);
    } catch (error: unknown) {
      if (Array.isArray(error) && error[0] instanceof ValidationError)
        throw new ValidationErrorExt(error as ValidationError[]);
      else throw error;
    }
  });
});
