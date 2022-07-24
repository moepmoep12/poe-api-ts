/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { step } from "mocha-steps";
import { expect } from "chai";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { ShowcasePinCollection } from "../../../../src/poe/shared/accounts";

import { Accounts } from "../../../../src/poe/apis/public";

describe("Path of Exile - PublicAPI - Accounts", function () {
  this.timeout(5000);

  const accountName = "TreeOfDead";
  let result: ShowcasePinCollection;

  it(`#getShowcasePins(${accountName}) - should return showcase pins`, async () => {
    result = <ShowcasePinCollection>(
      await expect(Accounts.getShowcasePins(accountName)).to.be.fulfilled
    );
  });

  step("validateOrReject(result) - should be fulfilled", async () => {
    try {
      await validateOrReject(result, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });
});
