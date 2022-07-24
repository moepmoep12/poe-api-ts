import "reflect-metadata";
import { describe, it } from "mocha";
import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { ShowcasePinCollection } from "../../../../src/poe/shared/accounts";

import showcasepinJson from "./resources/showcasepins.json";

describe("Path of Exile - PublicAPI - JSON - Accounts", function () {
  let showcasePinCollection: ShowcasePinCollection;

  before(() => {
    showcasePinCollection = plainToInstance(ShowcasePinCollection, showcasepinJson);
  });

  it("validateOrReject(showcasePinCollection) - should be fulfilled", async () => {
    try {
      await validateOrReject(showcasePinCollection, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });
});
