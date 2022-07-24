import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";

import { Items } from "../../../src/ninja/apis/";
import { SkillGemOverview } from "../../../src/ninja/apis/items/gems";

describe(`PoE.Ninja - Items - Skill Gems`, function () {
  this.timeout(30000);

  const league = "Standard";
  let result: SkillGemOverview;

  it(`#getOverview(${league}) - should return ItemOverview`, async () => {
    result = <SkillGemOverview>await expect(Items.SkillGems.getOverview(league)).to.be.fulfilled;
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
