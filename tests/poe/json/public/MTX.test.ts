import "reflect-metadata";
import { describe, it } from "mocha";
import { validateOrReject, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { MTXCollection } from "../../../../src/poe/apis/public/mtx";

import mtxSpecialsJson from "./resources/mtxSpecials.json";

describe("Path of Exile - Public - JSON - MTX", function () {
  let mtxSpecials: MTXCollection;

  before(() => {
    mtxSpecials = plainToInstance(MTXCollection, mtxSpecialsJson);
  });

  it("validateOrReject(mtxSpecials) - should be fulfilled", async () => {
    try {
      await validateOrReject(mtxSpecials, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });
});
