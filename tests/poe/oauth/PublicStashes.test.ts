/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";
import { mochaGlobalSetup } from "../../mochaFixtures";

import { PublicStashes, ServiceScopes } from "../../../src/poe/apis/oauth";

import { OAuthChunk } from "../../../src/poe/apis/oauth/public_stashes/Chunk";

import { APIError } from "../../../src/poe/errors";
import { ErrorMessage } from "../../../src/poe/errors/models/OAuthAPIError";

if (process.env.MOCHA_WORKER_ID) mochaGlobalSetup();

const hasScope = process.env.SCOPES?.includes(ServiceScopes.PsAPI);

describe("Path of Exile - OAuthAPI - PublicStashes", function () {
  this.timeout(30000);

  let chunk: OAuthChunk;

  if (!hasScope) {
    it(`#getChunk() - should reject insufficient scope`, async () => {
      await expect(PublicStashes.getChunk()).to.be.rejectedWith(
        APIError,
        ErrorMessage.InsufficientScope
      );
    });
    return;
  }

  it(`#getChunk() - should return public stash changes`, async () => {
    chunk = <OAuthChunk>await expect(PublicStashes.getChunk()).to.be.fulfilled;
  });

  step("validateOrReject(result) - should be fulfilled", async () => {
    try {
      await validateOrReject(chunk, validatorOptions);
    } catch (error: unknown) {
      if (Array.isArray(error) && error[0] instanceof ValidationError)
        throw new ValidationErrorExt(error as ValidationError[]);
      else throw error;
    }
  });

  step("result.getNext() - should fetch next public stash changes", async () => {
    await expect(chunk.getNext()).to.be.fulfilled;
  });
});
