import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";

import { Items } from "../../../src/ninja/apis/";
import { DeliriumOrbOverview } from "../../../src/ninja/apis/items/deliriumorbs";

describe(`PoE.Ninja - Items - Delirium Orbs`, function () {
  this.timeout(5000);

  const league = "Standard";
  let result: DeliriumOrbOverview;

  it(`#getOverview(${league}) - should return ItemOverview`, async () => {
    result = <DeliriumOrbOverview>(
      await expect(Items.DeliriumOrbs.getOverview(league)).to.be.fulfilled
    );
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