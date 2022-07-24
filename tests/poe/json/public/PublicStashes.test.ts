import "reflect-metadata";
import { describe, it } from "mocha";
import { validateOrReject, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { PublicChunk } from "../../../../src/poe/apis/public/public_stashes/Chunk";

import publicStashChangesJson from "./resources/publicStashChanges.json";

describe("Path of Exile - Public - JSON - PublicStashes", function () {
  let chunk: PublicChunk;

  before(() => {
    chunk = plainToInstance(PublicChunk, publicStashChangesJson);
  });

  it("validateOrReject(chunk) - should be fulfilled", async () => {
    try {
      await validateOrReject(chunk, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });
});
