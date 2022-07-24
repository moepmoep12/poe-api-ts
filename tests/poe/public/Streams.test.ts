/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";

import { Streams } from "../../../src/poe/apis/public";
import { Stream } from "../../../src/poe/shared/streams";

describe("Path of Exile - PublicAPI - Streams", function () {
  this.timeout(10000);

  let streams: Stream[];

  it("#get() - should return list twitch streams", async () => {
    streams = <Stream[]>await expect(Streams.get()).to.be.fulfilled;
  });

  step("validateOrReject(result) - should be fulfilled", async () => {
    for (const stream of streams) {
      try {
        await validateOrReject(stream, validatorOptions);
      } catch (error: unknown) {
        if (Array.isArray(error) && error[0] instanceof ValidationError)
          throw new ValidationErrorExt(error as ValidationError[]);
        else throw error;
      }
    }
  });
});
