/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";
import { mochaGlobalSetup } from "../../mochaFixtures";

import { PublicStashes } from "../../../src/poe/apis/public";
import { PublicChunk } from "../../../src/poe/apis/public/public_stashes/Chunk";

if (process.env.MOCHA_WORKER_ID) mochaGlobalSetup();

describe("Path of Exile - PublicAPI - PublicStashes", function () {
  this.timeout(30000);

  let result: PublicChunk;

  it(`#getChunk() - should return public stash changes`, async () => {
    result = <PublicChunk>await expect(PublicStashes.getChunk()).to.be.fulfilled;
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

  step("result.getNext() - should fetch next public stash changes", async () => {
    await expect(result.getNext()).to.be.fulfilled;
  });
});
