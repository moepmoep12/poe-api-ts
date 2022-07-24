/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";

import { MTX } from "../../../src/poe/apis/public";
import { MTXCollection } from "../../../src/poe/apis/public/mtx";

describe("Path of Exile - PublicAPI - MTX", function () {
  let result: MTXCollection;

  it("#getSpecials() - should return MTX specials", async () => {
    result = <MTXCollection>await expect(MTX.getSpecials()).to.be.fulfilled;
  });

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
