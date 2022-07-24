import "reflect-metadata";
import { describe, it } from "mocha";
import { validateOrReject, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { Item } from "../../../../src/poe/shared/item";

import { SessionStash } from "../../../../src/poe/apis/session/stashes";

import stashJson from "./resources/stash.json";
import stashTabJson from "./resources/stashTab.json";

describe("Path of Exile - SessionAPI - JSON - Stashes", function () {
  let stash: SessionStash;
  let stashTabItems: Item[];

  before(() => {
    stash = plainToInstance(SessionStash, stashJson);
    stashTabItems = plainToInstance(Item, stashTabJson.items);
  });

  it("validateOrReject(stash) - should be fulfilled", async () => {
    try {
      await validateOrReject(stash, validatorOptions);
    } catch (error: unknown) {
      if (Array.isArray(error) && error[0] instanceof ValidationError)
        throw new ValidationErrorExt(error as ValidationError[]);
      else throw error;
    }
  });

  it("validateOrReject(stashTabItems) - should be fulfilled", async () => {
    for (const item of stashTabItems) {
      try {
        await validateOrReject(item, validatorOptions);
      } catch (error: unknown) {
        if (Array.isArray(error) && error[0] instanceof ValidationError)
          throw new ValidationErrorExt(error as ValidationError[]);
        else throw error;
      }
    }
  });
});
